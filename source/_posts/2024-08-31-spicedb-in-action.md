---
title: "SpiceDB in Action"
excerpt: "SpiceDB is a database focused on authorization and access control, designed to implement fine-grained authorization (FGA) at scale. In this article, "SpiceDB in Action," you will learn how to user SpiceDB by building a simple full-stack application that leverages its powerful access control capabilities."
date: "2024-08-31T14:01:26.079Z"
author: Bruno Krebs
tags: ["SpiceDB", "Authorization", "Fine-Grained Authorization", "Access Control"]
---

## Introduction

[SpiceDB is a database focused on authorization and access control](https://authzed.com/docs/spicedb/getting-started/discovering-spicedb), designed to implement fine-grained authorization (FGA) at scale. In this article, "SpiceDB in Action," you will learn how to use SpiceDB by building a simple full-stack application that takes advantage of its robust access control capabilities.

Specifically, the journey begins with spinning up SpiceDB locally. You will then create a basic schema and develop a small full-stack app that demonstrates how to effectively use SpiceDB's access control features. As you progress, you'll gain insights into key SpiceDB concepts, and by the end of this article, you will have a solid understanding of how to incorporate SpiceDB into your projects.

## Fine-Grained Authorization Explained

Fine-grained authorization (FGA) refers to a detailed level of access control where permissions are defined at a more granular level compared to other access control strategies like RBAC and ABAC. Unlike traditional RBAC, where permissions are assigned based on roles, FGA allows for more nuanced and specific access control policies. This is particularly useful in complex systems where different users or groups may need varying levels of access to different parts of the system.

Compared to ABAC, FGA is more flexible and easier to manage. ABAC relies on attributes to define access control policies, which can become cumbersome to handle as the number of attributes grows. FGA, on the other hand, allows you to define permissions directly on resources, making it easier to understand and manage access control policies.

In the context of SpiceDB, FGA is central to its design. SpiceDB allows you to define permissions at the resource level, enabling you to specify exactly who can do what with each resource. For instance, in a document management system, you might want to allow certain users to view a document, others to edit it, and only a select few to delete it. With FGA, these permissions can be precisely defined and enforced.

FGA is particularly powerful when dealing with dynamic or hierarchical permissions. For example, in a multi-tenant application, you might need to define permissions that vary not only by user but also by the organization they belong to, the specific project they're working on, or even the status of the data they’re accessing. SpiceDB's support for FGA allows you to model these complex scenarios with ease.

By adopting FGA, you gain the flexibility to enforce security policies that match the specific needs of your application, ensuring that users have the right level of access to the right resources at the right time.

## Pre-requisites

To be able to follow along with this tutorial, you'll need to have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [SpiceDB CLI](https://github.com/authzed/zed)

Make sure you have these tools installed before proceeding.

## Setting Up SpiceDB Locally

To begin using SpiceDB, the first step is to run it locally using Docker. To ensure consistency and avoid potential issues with future versions, the Docker image will be pinned to a specific version, `v1.35.3`. This approach ensures that the instructions provided remain relevant even if new versions of SpiceDB are released.

The following command will start a SpiceDB instance:

```bash
docker run --rm -p 50051:50051 authzed/spicedb:v1.35.3 serve --grpc-preshared-key "some-random-key-here"
```

This command starts SpiceDB and makes it accessible on port `50051`. The `--grpc-preshared-key` flag is used to set a simple pre-shared key for gRPC communication. For the purposes of this tutorial, a fixed key is used for simplicity. In production, this key would typically be managed more securely.

### Validating the Setup

Now that SpiceDB is running locally, you can validate the setup by using the SpiceDB CLI to interact with the server. First, set up a context for the local server:

```bash
zed context set localz localhost:50051 "somerandomkeyhere" --insecure
```

> Note: Contexts in SpiceDB are used to manage connections to different servers. In this case, a context named `local` (an arbitrary name) is being set up to point to the local server running on `localhost:50051`.

After creating the context, list the available contexts to ensure that the local context is set correctly:

```bash
zed context list
```

The command above should output something similar to the following:

```text
CURRENT	NAME 	ENDPOINT       	TOKEN     	TLS CERT
   ✓   	local	localhost:50051	<redacted>	insecure
```

Next, run a simple command to ensure that the server is responding correctly:

```bash
zed version
```

This command will return the version of the CLI along with the version of the SpiceDB server you are running, confirming that the setup is correct:

```text
client: zed v0.21.0
service: v1.35.3
```
