---
title: "SpiceDB in Action"
excerpt: "SpiceDB is a database focused on authorization and access control, designed to implement fine-grained authorization (FGA) at scale. In this article, 'SpiceDB in Action', you will learn how to user SpiceDB by building a simple full-stack application that leverages its powerful access control capabilities."
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
zed context set local localhost:50051 "some-random-key-here" --insecure
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

## Creating the First SpiceDB Schema

With SpiceDB set up and running locally, the next step is to create an initial schema that will represent the foundation of the permissions system. In this section, you will define a basic schema, focusing on the core concepts of objects, relationships, and permissions.

### Schema Overview

The schema you’ll create represents the core components of a task management application. In this application, users will be allowed to create, view, edit, and also delete their own tasks. To manage these interactions, you will define two main object types: `user` and `task`. The `user` object represents the users of the system, while the `task` object represents the tasks that users can interact with. Additionally, the schema will define three types of permissions: `view`, `edit`, and `delete`.

> **Note**: you won't map the `create` permission just yet because there is a slight difference in how it is handled in SpiceDB compared to the other permissions. You will revisit this later in the tutorial.

### Schema Definition

Here’s the SpiceDB schema that defines the `user` and `task` objects, along with the relationships and permissions:

```text
definition user {}

definition task {
  relation owner: user
  relation editor: user
  relation viewer: user

  permission view = viewer + editor + owner
  permission edit = editor + owner
  permission delete = owner
}
```

Save the contents of the snippet above in a local file named `task-manager-schema.zed`. After that, run the following command to add it to SliceDB:

```bash
zed schema write task-manager-schema.zed
```

To make sure the schema was successfully written, you can read the schema back using the following command:

```bash
zed schema read
```

### SpiceDB Concept Definitions

In SpiceDB, authorization is modeled using three core concepts: objects, relationships, and permissions. These concepts work together to define who can do what within your application.

#### Objects

Objects are the fundamental entities within SpiceDB. They represent the resources or entities in your system that need to be protected. An object can be anything from a user, a document, or, in this case, a task.

- Example in Schema: In the task manager schema, the `user` and `task` objects are defined. The `user` object represents the users of the system, while the `task` object represents the tasks that users can interact with.

#### Relationships

Relationships define how objects are connected within SpiceDB. They establish links between objects and are used to determine access rights. A relationship typically connects an object to a user or another object, indicating a specific type of association, such as ownership or membership.

- Example in Schema: In the task manager schema, relationships like `owner`, `editor`, and `viewer` are defined within the `task` object. The `owner` relationship, for instance, links a `task` to a `user`, indicating that the `user` owns the `task` and, therefore, has permissions over it.

#### Permissions

Permissions in SpiceDB are rules that define what actions can be performed on objects based on the relationships. Permissions are typically defined by combining relationships, allowing for flexible and powerful access control policies.

- Example in Schema: In the task manager schema, the `view`, `edit`, and `delete` permissions are defined. The `view` permission is granted to users who are either `owners` or `viewers` of a `task`, while the `edit` permission is granted to `owners` or `editors`. The `delete` permission is reserved solely for the `owner`.

## Creating Relationship Instances

With the schema in place, the next step is to create specific relationship instances. These instances define which users can interact with which tasks, and in what capacity. By creating these relationships, you enforce the access control rules defined in the schema. When developing the application, you will create a few more relationship instances, but for the moment those should get you going.

Using the `zed` CLI, you can create relationships between users and tasks as follows:

```bash
# task-001 is owned by user-001
zed relationship create task:task-001 owner user:user-001

# task-001 is editable by user-002
zed relationship create task:task-001 editor user:user-002

# task-001 is viewable by user-003
zed relationship create task:task-001 viewer user:user-003

# task-002 is owned by user-002
zed relationship create task:task-002 owner user:user-002
```

The above, creates the following relationship instances:

- `task-001` is owned by `user-001`, editable by `user-002`, and viewable by `user-003`.
- `task-002` is owned by `user-002`.

Apart from the explicit relationships defined above, the schema also implicitly grants permissions based on the relationships. For example, `user-001` can view, edit, and delete `task-001` because they are the owner. Similarly, `user-002` can view and edit `task-001` because they are an editor, and `user-003` can view `task-001` because they are a viewer.

To make sure those permissions are properly set, you can check them using the following commands:

```bash
# check if user-001 can view task-002 (should return false)
zed permission check task:task-002 view user:user-001

# check if user-002 can view task-002 (should return true)
zed permission check task:task-002 view user:user-002

# check if user-002 can view task-001 (should return true)
zed permission check task:task-001 view user:user-002

# check if user-001 can view task-001 (should return true)
zed permission check task:task-001 view user:user-001
```

The commands above validate the permissions set in the schema. For instance, `user-002` can view `task-001` because they are an editor, while `user-001` cannot view `task-002` because they are not the owner.

## Integrating SpiceDB with a Node.js

Now that you have SpiceDB up and running and have played a bit with the schema and some relationships, it is time to learn how to integrate it with Node.js. In this section, you will create a simple Node.js script that talks to SpiceDB and checks permissions. The focus will be on the core interaction between the Node.js and SpiceDB, rather than building a full-blown API.

### The NPM project

First, create a new directory for the project and navigate into it:

```bash
mkdir spicedb-nodejs-demo
cd spicedb-nodejs-demo
```

Then, initialize a new NPM project:

```bash
npm init -y
```

Now, open the directory in your preferred IDE/editor and load the `package.json` file. On that file, add `"type": "module"` to it. This tells Node.js that the project is using ECMAScript modules.

```json
{
  //...
  "type": "module",
  //...
}
```

After creating the new project and configuring it to behave as an ECMAScript module, you can use your terminal to install the `@authzed/authzed-node` package, which provides the client library for interacting with SpiceDB:

```bash
npm install @authzed/authzed-node
```

### Script for Checking Permissions

With that in place, create a `src` directory in your NPM project and an `check-permission.js` file inside it:

```bash
mkdir src
touch src/check-permission.js
```

Then, open the `src/check-permission.js` file and add the following code:

```javascript
import { v1 } from '@authzed/authzed-node';

const client = v1.NewClient('some-random-key-here', 'localhost:50051', v1.ClientSecurity.INSECURE_LOCALHOST_ALLOWED);

try {
  const response = await new Promise((resolve, reject) => {
    client.checkPermission({
      resource: {
        objectType: 'task',
        objectId: 'task-001',
      },
      permission: 'view',
      subject: {
        object: {
          objectType: 'user',
          objectId: 'user-001',
        },
      },
    }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });

  switch (response.permissionship)  {
    case v1.CheckPermissionResponse_Permissionship.NO_PERMISSION:
      console.log('No permission... go away');
      break;
    case v1.CheckPermissionResponse_Permissionship.HAS_PERMISSION:
      console.log('You do have permission. Go ahead!');
      break;
    case v1.CheckPermissionResponse_Permissionship.UNSPECIFIED:
      console.log('Unknown permissionship!? What are you doing here?');
      break;
  }
} catch (error) {
  console.error('Oh, damn, error checking permission:', error);
}
```

Here's a breakdown of what this code does:

1. It imports the SpiceDB client library.
2. It creates a new client, connecting to the local SpiceDB server. You should replace `some-random-key-here` in case you used a different key when starting the server.
3. It uses the `checkPermission` method to ask SpiceDB if `user-001` has permission to `view` the `task-001`.
4. The callback-based `checkPermission` method is wrapped in a Promise. This allows the use of `async`/`await` syntax, which is more convenient to work with.
5. It then checks the `permissionship` in the response. This indicates whether the user has permission or not.
6. Finally, it logs a message based on the result. If something goes wrong, it catches the error and logs it.

To run this script, you can use the following command:

```bash
node src/check-permission.js
```

If everything is set up correctly, you should see a message indicating whether `user-001` has permission to view `task-001`. If the permission is granted, the message should say "You do have permission. Go ahead!".

### Script For Bulk Checking Permissions

Another important feature of SpiceDB is the ability to check permissions in bulk. This is useful when you need to check permissions for multiple users or resources at once without making individual requests for each one. In this section, you will see how to use the bulk permission check feature in SpiceDB.

To do that, create a new file named `bulk-check-permissions.js` inside the `src` directory and add the following code:

```javascript
import { v1 } from '@authzed/authzed-node';

const client = v1.NewClient('some-random-key-here', 'localhost:50051', v1.ClientSecurity.INSECURE_LOCALHOST_ALLOWED);

try {
  const response = await new Promise((resolve, reject) => {
    client.checkBulkPermissions({
      items: [
        {
          resource: {
            objectType: 'task',
            objectId: 'task-001',
          },
          permission: 'view',
          subject: {
            object: {
              objectType: 'user',
              objectId: 'user-001',
            },
          },
        },
        {
          resource: {
            objectType: 'task',
            objectId: 'task-002',
          },
          permission: 'view',
          subject: {
            object: {
              objectType: 'user',
              objectId: 'user-001',
            },
          },
        },
      ],
    }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });

  response.pairs.map((pair) => {
    const permissionship = pair.response.item.permissionship;
    const objectId = pair.request.resource.objectId;
    const subject = pair.request.subject.object.objectId;
    switch (permissionship) {
      case v1.CheckPermissionResponse_Permissionship.NO_PERMISSION:
        console.log(`${subject} has no permission for ${objectId}... tell them to go away`);
        break;
      case v1.CheckPermissionResponse_Permissionship.HAS_PERMISSION:
        console.log(`${subject} has permission for ${objectId}. Tell them to proceed!`);
        break;
      case v1.CheckPermissionResponse_Permissionship.UNSPECIFIED:
        console.log(`I don't understand the permissionship for ${subject} and ${objectId}. What are you trying to do?`);
        break;
    }
  });
} catch (error) {
  console.error('Oh, damn, error checking permission:', error);
}
```

After that, you can run the script using the following command:

```bash
node src/bulk-check-permissions.js
```

If things work as expected, you should see an output like this:

```text
user-001 has permission for task-001. Tell them to proceed!
user-001 has no permission for task-002... tell them to go away
```

This output indicates that `user-001` has permission to view `task-001` but not `task-002`.

The code shouldn't be too hard to understand, but one thing worth mentioning is the `response.pairs.map` method. This method iterates over the pairs of requests and responses, allowing you to process each one individually.

On the first script, where you checked for a single permission, you didn't have to care about extracting resource and subject information from the response because, well, there was only one. But when checking permissions in bulk, you need to process each pair individually to get the relevant information.
