---
title: "Understanding Big O Notation: A Guide for Software Engineers"
excerpt: "In this article, you will learn about the concept of Big O notation, an important concept in computer science
that describes about algorithms' performance and complexity. The goal is to demystify Big O notation and why it is
crucial for assessing algorithms. You will also learn how to identify how an algorithm affects your software's
scalability, and how to use different Big O notations (like O(1), O(n), O(log n), O(n^2), etc.) to represent different
algorithms."
date: "2021-07-25T15:02:07.322Z"
author: Bruno Krebs
tags: ["Data Structures", "Algorithms", "Big O Notation", "Performance Optimization"]
---

## Introduction

Big O notation is a tool used by software engineers to check how efficient an algorithm is. If you haven't heard or studied about the Big O notation before, the name might sound a bit scaring. However, the concept itself is simple enough even for everyone to understand. Even those who are just getting started on the field.

Yes, there will be times (algorithms) that will be not-that-easy to analyze, but most of the time, you will be able to identify an algorithms complexity very fast. Read on and learn how the Big O notation works. I hope you enjoy the content.

## What is Big O Notation?

Big O notation is a way to express the worst case scenario of an algorithm's time or space complexity. In simpler terms, it helps you answer the following question:

> As the size of my input grows, how does that affect my algorithm's performance?

**Time complexity** with Big O notation is all about how much _time_ the algorithm takes to run in relation to the input used with it. Often represented as `n`, time in this context does not refer minutes, seconds and the like, but rather the number of operations an algorithm needs to perform.

**Space complexity**, on the other hand, is about how much _space_ (or more specifically memory) the algorithm needs process an input.

If you understand the Big O notation, you will be able to predict and talk about how an algorithm will scale. From time to time, dependending on the area of software development that you work on, you will need to apply this knowledge to write (or improve) some algorithm that deals with a large amount of data.

## Understanding Different Big O Notations


### O(1) - Constant Time

The first time complexity you will learn about is called "O(1) Constant Time". This one is super easy to understand and also the most efficient one. O(1) represents a constant time complexity where, no matter the size of the input, you will always finish the computation in just one  operation.

That is, an algorithm is said to have a constant time complexity when the time taken for it to complete its process does not change with the size or complexity of the input data set. A classic example of this is accessing an element from an array by its index. Regardless of the size of the array, it takes the same amount of time to retrieve an item because you're directly accessing it by its exact address in memory.

The code snippet below shows an example of an algorithm with a contant time complexity:

```js
function getItemAtIndex(array, index) {
  return array[index];
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(getItemAtIndex(array, 4));
```

In the code snippet above, you can see a function called `getItemAtIndex` (by the way, this function exists for illustration purposes only, as it is quite useless to create a function like that) that receives two parameters: `array` and `index`. Then you can see that the function returns an item from the `array` based on the `index` parameter.

If you were to play with this example, you would see that you could change the `array` you are passing to `getItemAtIndex` and add thousands and thousands of items, and the function itself (the algorithm) would be as efficient as it is when you have just 10 items. That is, the time needed for the algorithm to complete its process is constant.

The graph below shows the input size growing (x axis) while the time complexity staying at 1 all the time.

<canvas id="constantTime"></canvas>

### O(n) - Linear Time

The O(n) notation represents linear time complexity. This notation refers to an algorithm where the time complexity grows along with the size of the input data. That is, if you double the size of the input, the time complexity will roughly double as well.

As an example, check the following code snippet:

```js
function findValue(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(findValue(array, 6));
```

As you can see, `findValue` function (the algorithm you will examine), gets an `array` and tries to find the position  (the index) of a `value` inside this array. So, this algorithm is considered to have an O(n) linear time complexity because, if the size of the `array` parameter grows, finding the requested value will take longer and longer.

Sure, if, by chance, the function is called with an `array` with a million elements and a `value` that is on the very first position, the algorithm will end up instantaneously. However, what you have to remember is that the Big O notation is about the worst case scenario. That is, on the scenario described here, you have to consider what would happen if you end up calling `findValue` with a `value` that is on the far end of the `array`.

The following graph represents the Big O notation for "O(n) - Linear Time" algorithms. You can see on this graph that, if the input size is `4`, `4` will be the time complexity; if the size is `7`, the time complexity will also be `7`; and so on.

<canvas id="linearTime"></canvas>

### O(log n) - Logarithmic Time

The O(log n) logarithmic time complexity refers to an algorithm where the time complexity increases logarithmically in relation to the size of the input data set. That is, an algorithm of that complexity is expected to perform better than an algorithm that grows linearly (the O(n) above).

One of the most popular examples of an algorithm that is O(log n) is the binary search one. If you don't know the binary search algorithm, take a look at the following code snippet:

```js
function binarySearch(array, value) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const middleIndex = Math.floor((start + end) / 2);

    const valueInTheMiddleIndex = array[middleIndex] === value;
    if (valueInTheMiddleIndex) return middleIndex;

    const valueSmallerThanElementInTheMiddle = value < array[middleIndex];
    if (valueSmallerThanElementInTheMiddle) end = middleIndex - 1;
    else start = middleIndex + 1;
  }
  return -1;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(array, 6));
```

What you see above is an algorithm that is parsing a sorted array (note, the array used with the binary search must be sorted for it to work) in search for an element. The function above has the same goal of the `findValue` on the previous section ("O(n) - Linear Time"), however, the difference is that instead of checking one element after the other, the  `binarySearch` algorithm jumps around. This is what the algorithm does:

1. Gets the element in the middle of the array (`valueInTheMiddleIndex`).
2. Compares to the `value` being search.
3. If `valueInTheMiddleIndex` and `value` are equal, return the index.
4. If `value` is smaller than `valueInTheMiddleIndex`, discard the right side of the `array` (`end = middleIndex - 1`).
5. If `value` is greater than `valueInTheMiddleIndex`, discard the left side of the `array` (`start = middleIndex + 1`).

So, for an `array` (an input) that is sorted, binary search will probably be way faster than the previous example.

The graph below shows how O(log n) logarithmic time algorithms behave when their input grows:

<canvas id="logarithmicTime"></canvas>

### O(n log n) - Linearithmic Time

<!-- <BigO timeComplexitiesShown={['bigONotation1', 'bigONotationN', 'bigONotationNLogN']} /> -->

### O(n^2) - Quadratic Time

### O(2^n) - Exponential Time

### O(n!) - Factorial Time

## Examples in Code

Use practical examples in a popular programming language (like Python, Java, JavaScript etc.) to demonstrate each time complexity.

## Visualizing Big O Notation

Use graphs to visualize how the different time complexities would perform with an increasing number of inputs.

## How to Calculate Big O?

Briefly discuss how to determine an algorithm's Big O notation, including rules for calculating Big O and common pitfalls.

## Importance of Big O in Real-world Scenarios

Discuss how understanding Big O impacts the real world. You can provide some real-world scenarios where choosing the right algorithm (based on understanding of Big O) made a huge difference.

## Conclusion

Recap of the importance of understanding Big O notation for any software engineer. Encourage readers to apply this knowledge in their programming practice.

## References and Further Reading

Provide references to any materials or textbooks you quoted or took inspiration from. This might also include suggestions for readers who want to delve deeper.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
var ctx = document.getElementById('logarithmicTime').getContext('2d');
var logarithmicTime = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024], // Array sizes
    datasets: [{
      label: 'Max Steps in Binary Search',
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Log base 2 steps for each size
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        type: 'logarithmic',
        position: 'left',
        beginAtZero: false,
        title: {
          display: true,
          text: 'Number of Steps (log scale)'
        },
        ticks: {
          callback: function(value, index, values) {
            if (value === 10 || value === 100 || value === 1000) {
              return '10^' + Math.log10(value).toFixed(0);
            }
            return null;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Array Size (n)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
});

var ctx = document.getElementById('linearTime').getContext('2d');
var linearTime = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Array sizes
        datasets: [{
            label: 'Steps in Linear Search',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Steps increase linearly with array size
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Steps'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Array Size (n)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});

var ctx = document.getElementById('constantTime').getContext('2d');
var constantTime = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Array sizes
        datasets: [{
            label: 'Constant Time Complexity',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Constant steps regardless of array size
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Number of Operations'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Array Size (n)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
});
</script>
