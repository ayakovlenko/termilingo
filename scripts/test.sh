#!/usr/bin/env bash
set -eax

deno test --coverage=./cov_profile src/
deno coverage ./cov_profile --html
