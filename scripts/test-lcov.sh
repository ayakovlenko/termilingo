#!/usr/bin/env bash
set -eax

deno test --coverage=./cov_profile src/
deno coverage --lcov ./cov_profile > cov_profile/cov.lcov
