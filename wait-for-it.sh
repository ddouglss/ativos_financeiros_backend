#!/usr/bin/env bash
# wait-for-it.sh - Aguarda um host:porta estar disponível e executa um comando

WAITFORIT_cmdname=${0##*/}

# Defaults
WAITFORIT_TIMEOUT=60
WAITFORIT_STRICT=0
WAITFORIT_QUIET=0
WAITFORIT_CHILD=0

echoerr() {
  if [[ $WAITFORIT_QUIET -ne 1 ]]; then echo "$@" 1>&2; fi
}

usage() {
  cat << USAGE >&2
Usage:
  $WAITFORIT_cmdname host:port [-s] [-q] [-t timeout] [-- command args]
Options:
  -s | --strict               Only run subcommand if the test succeeds
  -q | --quiet                Suppress status messages
  -t TIMEOUT | --timeout=TIMEOUT
                              Timeout in seconds, zero means wait forever
  -- COMMAND ARGS             Execute command after host:port is available
USAGE
  exit 1
}

wait_for() {
  local start_ts=$(date +%s)
  echoerr "$WAITFORIT_cmdname: waiting $WAITFORIT_TIMEOUT seconds for $WAITFORIT_HOST:$WAITFORIT_PORT"

  while :
  do
    (echo > /dev/tcp/$WAITFORIT_HOST/$WAITFORIT_PORT) >/dev/null 2>&1 && break
    sleep 1
  done

  local end_ts=$(date +%s)
  echoerr "$WAITFORIT_cmdname: $WAITFORIT_HOST:$WAITFORIT_PORT is available after $((end_ts - start_ts)) seconds"
  return 0
}

wait_for_wrapper() {
  if command -v timeout >/dev/null 2>&1; then
    timeout $WAITFORIT_TIMEOUT "$0" --child --host="$WAITFORIT_HOST" --port="$WAITFORIT_PORT" --timeout="$WAITFORIT_TIMEOUT" ${WAITFORIT_QUIET:+--quiet}
    WAITFORIT_RESULT=$?
    if [[ $WAITFORIT_RESULT -ne 0 ]]; then
      echoerr "$WAITFORIT_cmdname: timeout occurred after waiting $WAITFORIT_TIMEOUT seconds for $WAITFORIT_HOST:$WAITFORIT_PORT"
    fi
    return $WAITFORIT_RESULT
  else
    echoerr "$WAITFORIT_cmdname: warning: 'timeout' command not found, fallback to basic wait"
    wait_for
    return $?
  fi
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    *:* )
      IFS=':' read -r WAITFORIT_HOST WAITFORIT_PORT <<< "$1"
      shift
      ;;
    --child)
      WAITFORIT_CHILD=1
      shift
      ;;
    -q|--quiet)
      WAITFORIT_QUIET=1
      shift
      ;;
    -s|--strict)
      WAITFORIT_STRICT=1
      shift
      ;;
    -t)
      WAITFORIT_TIMEOUT="$2"
      shift 2
      ;;
    --timeout=*)
      WAITFORIT_TIMEOUT="${1#*=}"
      shift
      ;;
    --host=*)
      WAITFORIT_HOST="${1#*=}"
      shift
      ;;
    --port=*)
      WAITFORIT_PORT="${1#*=}"
      shift
      ;;
    --)
      shift
      WAITFORIT_CLI=("$@")
      break
      ;;
    *)
      echoerr "Unknown argument: $1"
      usage
      ;;
  esac
done

if [[ -z "$WAITFORIT_HOST" || -z "$WAITFORIT_PORT" ]]; then
  echoerr "Error: host and port must be specified."
  usage
fi

if [[ $WAITFORIT_CHILD -eq 1 ]]; then
  wait_for
  exit $?
else
  if [[ $WAITFORIT_TIMEOUT -gt 0 ]]; then
    wait_for_wrapper
    WAITFORIT_RESULT=$?
  else
    wait_for
    WAITFORIT_RESULT=$?
  fi
fi

if [[ ${WAITFORIT_CLI[*]} ]]; then
  if [[ $WAITFORIT_RESULT -ne 0 && $WAITFORIT_STRICT -eq 1 ]]; then
    echoerr "$WAITFORIT_cmdname: strict mode, refusing to execute subprocess"
    exit $WAITFORIT_RESULT
  fi
  exec "${WAITFORIT_CLI[@]}"
else
  exit $WAITFORIT_RESULT
fi
