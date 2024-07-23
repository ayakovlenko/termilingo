#!/usr/bin/env bash
deno test --coverage=cov_profile src/
deno coverage cov_profile --html
