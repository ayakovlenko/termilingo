#!/usr/bin/env bash
set -eax

deno test --allow-read --allow-write --allow-env=LOG_TOKENS,LOG_STREAM --coverage=./cov_profile src/
deno coverage --lcov ./cov_profile > cov_profile/cov.lcov
