---
title: "Debugging GitHub Actions with Oh My Zsh"
excerpt: "'Debugging with Oh My Zsh' is a tool I created to help developers debug their CI checks on GitHub Actions. This tool not only simplifies the debugging process but also significantly enhances developer experience by providing real-time, interactive SSH access to workflow environments. Dive into the development journey behind this innovative solution, and see how it brings efficiency and clarity to troubleshooting CI/CD pipelines."
date: "2024-03-19T07:25:57.300Z"
author: Bruno Krebs
tags: ["GitHub Actions", "CI", "Continuous Integration", "Debugging", "Oh My Zsh"]
---

## The Inspiration

The idea for ["Debugging GitHub Actions with Oh My Zsh"](https://github.com/brunokrebs/action-oh-my-zsh/) sprang from a need to simplify and enhance the debugging process for GitHub Actions. Traditional debugging methods often felt detached and inefficient, leading to longer resolution times and frustration.

Inspired by Zsh and [Oh My Zsh’s powerful shell](https://ohmyz.sh/) capabilities and [Upterm’s](https://github.com/lhotari/action-upterm/) innovative remote access features, I envisioned a tool that merges these strengths. This would allow developers to SSH directly into their running workflows, using a familiar and friendly terminal setup. The result aims to transform debugging from a tedious task into a more intuitive, engaging experience while also allowing developers to load the CI environment on their IDEs (e.g., with the help of VSCode’s [Remote - SSH](https://code.visualstudio.com/docs/remote/ssh) extension).

### How does this differ from Upterm?

While Upterm provided a fantastic foundation by enabling terminal sharing and SSH access for real-time collaboration, "Debugging GitHub Actions with Oh My Zsh" diverges in its focus and application. Upterm primarily aimed at collaborative terminal sessions, making it possible for developers to share and access shell sessions across teams. This approach was highly beneficial for educational purposes, remote pair programming, or troubleshooting with assistance from colleagues.

In contrast, "Debugging GitHub Actions with Oh My Zsh" is specifically tailored for developers working with GitHub Actions. It focuses on offering individual developers a way to access and debug their CI/CD workflows directly within the GitHub Actions environment. This action leverages the dynamic and feature-rich interface of Oh My Zsh, enhancing the debugging experience by integrating familiar tools and plugins that many developers already use in their local setups.

## Tool Overview

The action will create an SSH tunnel using Ngrok and will provide you with the URL to access the environment. You can then use the URL to access the environment and debug your workflow.

The available options you have are:

`ngrok-auth-token` (required): The Ngrok authentication token. You can create a new token here.
`ssh-timeout`: The timeout for the SSH tunnel. Default is `300` seconds (5 minutes).
`allowed-github-users`: A list of GitHub usernames that are allowed to access the environment.
`allow-pr-owner`: A boolean to allow the PR owner to access the environment. Default is `false`.

You will have to set either the `allowed-github-users` or `allow-pr-owner` options to allow access to the environment. Otherwise, the action will fail.

```yaml
name: My Workflow Using Debugging Action

on: [push, pull_request]

jobs:
  debug-environment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Setup zsh session
        uses: brunokrebs/action-oh-my-zsh@v1
        if: failure()
        with:
          ngrok-auth-token: ${{ secrets.NGROK_AUTH_TOKEN }}
          ssh-timeout: 60
          allow-pr-owner: true
          allowed-github-users: "brunokrebs"
```

**Notice** the `if: failure()` condition. This will only run the debugging action if the previous step fails. This is useful to avoid running the action when everything is working as expected.

Once the action is running, you will see the following output in the logs:

![Action Output](https://github.com/brunokrebs/action-oh-my-zsh/raw/main/output.png)

### Preloading the environment

You can preload the environment with the tools you need by creating an env_setup.sh file in the $HOME directory. This file will be sourced when the SSH session is created, so you can add any environment variables or commands you need to run.

```yaml
- name: Prepare environment setup script
  if: failure()
  run: |
    echo "export PATH=/opt/hostedtoolcache/node/20.11.1/x64/bin:\$PATH" > $HOME/env_setup.sh
    echo "export PATH=/opt/hostedtoolcache/go/1.22.1/x64/bin:\$PATH" >> $HOME/env_setup.sh
```

Add the above step **before** the `Setup zsh session` step to preload the environment with the tools you need.

## Development Journey

Creating "Debugging GitHub Actions with Oh My Zsh" was a hands-on learning experience focused on integrating the powerful Zsh environment into the GitHub Actions workflow. The idea was to enable real-time debugging through SSH, similar to what developers are accustomed to on their local machines but within the context of a GitHub Actions runner.

**Technical Challenges**: One of the first significant hurdles was setting up a stable and secure SSH connection directly into the GitHub Actions runner. This required integrating Ngrok to establish a tunnel, which was challenging to configure correctly to ensure both stability and security. Each adjustment needed careful testing to confirm that the connections were not only stable across different network conditions but also secure from unauthorized access.

**Zsh Integration**: The next step involved installing Zsh and Oh My Zsh on GitHub's virtual environments, which are typically streamlined for quick CI/CD runs. This process needed to be efficient and reliable, ensuring that the Zsh environment was ready and configured correctly every time the action was triggered.

Usability Enhancements: With the core functionality in place, I turned my attention to making the tool as user-friendly as possible. This meant building a clear and straightforward setup process and providing users with configurable options like SSH timeout and access permissions based on GitHub usernames.

Throughout the development, each feature and integration was rigorously tested to ensure it performed well within the GitHub Actions environment. While there wasn't a formal feedback loop from early adopters, hypothetical user scenarios and potential use cases played a crucial role in shaping the tool's development, focusing on practicality and ease of use.

This development journey provided valuable insights into both the potential and limitations of GitHub Actions, guiding the tool from concept to a practical solution aimed at simplifying the debugging process for developers using GitHub Actions.

## Implementation Details

The implementation of "Debugging GitHub Actions with Oh My Zsh" involved several key steps to ensure the tool was both effective and user-friendly. Here’s a closer look at how each component was integrated and configured:

**SSH and Ngrok Integration**: The core of this tool revolves around setting up a secure SSH connection to the GitHub Actions runner. Ngrok plays a critical role here by creating a secure tunnel from the public internet to the runner. I automated the installation of Ngrok within the GitHub Actions environment and configured it to start a tunnel to the SSH port as soon as the action is triggered. This setup ensures that developers can connect to the runner using standard SSH clients immediately upon action execution.

**Zsh and Oh My Zsh Setup**: Installing Zsh and Oh My Zsh in the GitHub Actions environment required careful scripting to ensure compatibility and performance. Each runner starts with a minimal setup, so I scripted the installation of Zsh, followed by the Oh My Zsh framework. This script ensures that Zsh is not only installed but also configured with a selection of useful plugins and themes from Oh My Zsh, enhancing the debugging interface.

**Configuration and Security**: To make the tool adaptable to different user needs while maintaining security, I implemented configurable options such as `ssh-timeout`, `allowed-github-users`, and `allow-pr-owner`. These settings let users define how long the SSH session remains open and who can access it. The implementation involves dynamically updating SSH configuration files and the authorized_keys file based on these user inputs. I used conditional checks within the GitHub Actions script to append or modify these configurations at runtime.

**User Experience Enhancements**: To improve the user experience, I focused on clear documentation and intuitive setup procedures. The GitHub Action is designed to output the Ngrok URL and necessary connection details directly in the action logs, making it easy for users to know how and where to connect.

This detailed approach to implementation ensures that "Debugging GitHub Actions with Oh My Zsh" not only performs its intended function effectively but also provides a user-friendly experience that aligns with developers' expectations and needs in a CI/CD environment.

## Next Steps

There are a few things that I would like to change on this tool:

1. Remove the dependency on root access. This would make it easier to run on self-hosted runners.
2. Enable the action to run in parallel with other steps, which would allow developers to connect to the environment while the workflow is still running.

