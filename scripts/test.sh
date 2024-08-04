#!/usr/bin/env bash
set -eax

deno test --allow-read --allow-write --coverage=./cov_profile src/
deno coverage ./cov_profile --html
