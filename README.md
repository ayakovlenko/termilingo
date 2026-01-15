# Termilingo

![](https://github.com/ayakovlenko/termilingo/actions/workflows/test.yaml/badge.svg)
[![](https://coveralls.io/repos/github/ayakovlenko/termilingo/badge.svg?branch=main)](https://coveralls.io/github/ayakovlenko/termilingo?branch=main)

Termilingo is a spaced repetition flashcard app designed for use in the
terminal.

The app is written in TypeScript and uses Deno as a TypeScript runtime. In order
to use it, you need install Deno first:
https://docs.deno.com/runtime/manual/getting_started/installation/

It uses a simple deck format to create flashcards:

```csv
Question,Answer
Front side,Back side
Front side,Back side
```

> [!TIP]\
> This is the format of Brainscape CSV export, so they can be used by Termilingo
> directly.

## Scoring system

Termilingo does not rely on self-assessed scores. Instead, it uses an automated
performance scoring system based on the Levenshtein ratio between the correct
answer and the answer that you have typed.

Since Termilingo relies on SM2 algorithm, the score is then converted to SM2
grade according to the following rules:

| Score range         | Grade |
| ------------------- | ----- |
| 0 ≤ score < 0.50    | 0     |
| 0.50 ≤ score < 0.70 | 1     |
| 0.70 ≤ score < 0.80 | 2     |
| 0.80 ≤ score < 0.90 | 3     |
| 0.90 ≤ score < 1.00 | 4     |
| score = 1.00        | 5     |

<img src="./docs/score2grade-plot.png" width="50%">

<details>

<summary>Plot source</summary>

```python
import matplotlib.pyplot as plt
import numpy as np

# Define the score ranges and corresponding grades
score_ranges = [0, 0.5, 0.7, 0.8, 0.9, 1.0]
grades = [0, 1, 2, 3, 4, 5]

# Extend the score ranges to create steps
extended_scores = []
extended_grades = []

for i in range(len(score_ranges) - 1):
    extended_scores.append(score_ranges[i])
    extended_scores.append(score_ranges[i+1])
    extended_grades.append(grades[i])
    extended_grades.append(grades[i])

# Plot the function
plt.figure(figsize=(10, 6))
plt.step(extended_scores, extended_grades, where='post', label='score2grade Function', color='b', linewidth=2)
plt.scatter(score_ranges, grades, color='red')  # Highlight the points

# Adding labels and title
plt.xlabel('Score')
plt.ylabel('Grade')
plt.title('score2grade Function Plot')
plt.xticks(np.arange(0, 1.1, 0.1))
plt.yticks(np.arange(6))
plt.grid(True)
plt.legend()
plt.show()
```

</details>

## Quickstart

Run with an example deck:

```sh
npm run build

npm start -- --deck example-swedish.csv
```

Provide a path to your own deck and start practicing.

On the first run, the app will create a complimentary review file following a
convention `<deck-name>.review.yaml` to keep track of the state.

## Thanks

The app is using an implementation of SM2 by @VienDinhCom.

The package is copied into [./src/supermemo](./src/supermemo) with the intention
of modifying it into SM2+ as described in the article by BlueRaja
[here][sm2plus].

[sm2plus]: https://www.blueraja.com/blog/477/a-better-spaced-repetition-learning-algorithm-sm2
