---
title: "Elixir Data Types - Cheatsheet"
excerpt: "A quick reference guide to the basic and advanced data types in Elixir, including integers, floats, booleans, strings, lists, tuples, maps, keyword lists, binaries, ranges, structs, protocols, and records."
date: "2024-04-03T20:32:01.525Z"
author: Bruno Krebs
tags: ["elixir", "cheatsheet", "data-types", "programming"]
---

Elixir is a functional programming language built on top of the Erlang VM, designed for building scalable and maintainable applications. It provides a rich set of data types to work with, ranging from basic types like integers and floats to more advanced types like structs and protocols. This cheatsheet serves as a quick reference guide to the various data types available in Elixir, including their definitions and common use cases.

## Basic Types

### Integers
Whole numbers that can also be represented in binary, octal, and hexadecimal formats.

### Floats
Decimal numbers adhering to the IEEE 754 standard for floating-point arithmetic.

### Booleans
Represent true or false values, technically shortcuts for the atoms :true and :false.

## Collection Types

### Strings
UTF-8 encoded binaries, utilized for text and defined with double quotes.

### Lists
Ordered collections of elements (which can be of various types) enclosed in square brackets.


### Tuples
Collections similar to lists but stored contiguously in memory, enclosed in curly braces, and typically faster to access.

### Maps
Key-value stores where keys can be of any type, defined with the %{} syntax.

### Keyword Lists
Special lists composed of tuples where the first item is an atom, typically used for passing options to functions.

### Binaries
Sequences of bytes, useful for handling raw binary data.

### Ranges
Represents a sequence of numbers, defined using the start..end syntax.

## Advanced Types

### Structs
Extensions of maps that provide compile-time checks and default values, defined using defstruct in a module context to create custom structured 
types.

### Protocols
Enable polymorphism in Elixir, defining a set of functions that different data types can implement, allowing for behavior customization based on 
the type.

### Records
Fixed structure types borrowed from Erlang, useful when working with Erlang libraries or where performance is a critical concern.

## Syntactic Tools

### Sigils
Provide a way to generate and work with common data types more succinctly, like regex patterns, lists of words, or strings using specific prefixed 
characters.
