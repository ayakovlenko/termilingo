#!/usr/bin/env bash
set -eax

deno test --allow-read --allow-write --coverage=./cov_profile src/
deno coverage --lcov ./cov_profile > cov_profile/cov.lcov
