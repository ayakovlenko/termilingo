# termilingo

![](https://github.com/ayakovlenko/termilingo/actions/workflows/test.yaml/badge.svg)
[![](https://coveralls.io/repos/github/ayakovlenko/termilingo/badge.svg?branch=main)](https://coveralls.io/github/ayakovlenko/termilingo?branch=main)

## Run

```sh
deno task run --deck example-deck.yaml
```

## Grading

Score to SM2 grade conversion:

| Score range         | Grade |
| ------------------- | ----- |
| 0 ≤ score < 0.50    | 0     |
| 0.50 ≤ score < 0.70 | 1     |
| 0.70 ≤ score < 0.80 | 2     |
| 0.80 ≤ score < 0.90 | 3     |
| 0.90 ≤ score < 1.00 | 4     |
| score = 1.00        | 5     |
