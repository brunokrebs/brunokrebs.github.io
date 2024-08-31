---
title: "CAP Theorem: A brief introduction"
excerpt: "This blog post introduces the CAP theorem, a fundamental principle for software engineers that states that it's impossible to achieve Consistency, Availability, and Partition tolerance (hence CAP) simultaneously in distributed systems. Here, you will learn about the implications of the CAP theorem for distributed systems and learn about the trade-offs between consistency and availability in those systems."
date: "2018-10-21T10:11:49.120Z"
author: "Bruno Krebs"
tags: ["distributed systems", "CAP theorem", "consistency", "availability"]
---

## Introduction to the CAP Theorem

### What are distributed systems?
Distributed systems are a collection of independent computers that operate together to provide a system or service to users. For example, Facebook, Google, Youtube, WhatsApp, your bank app and many other services that you use on a daily basis are distributed systems. These systems are usually designed to handle large amounts of data and traffic but, more importantly, to provide scalability, fault tolerance, and high availability.

In summary, a distributed system in a system that, from the users' perspective, looks like a single system but is composed of multiple components that work together to provide the desired functionality.

![Distributed Systems](/images/distributed-systems.png)

### What is the CAP Theorem?

The CAP theorem, also known as Brewer's theorem, is a theorem that states that it's impossible to achieve Consistency, Availability, and Partition tolerance (hence CAP) simultaneously in distributed systems. According to the CAP theorem, a distributed system can only guarantee two of the three properties at the same time.

Before learning why it's impossible to achieve all three properties simultaneously, take a look at the definition of each on of those properties.

### Consistency

Consistency means that all nodes in the distributed system have the same data at the same time. That is, if you write data to one node, all other nodes in the system should have the same data when another read operation is performed. In other words, consistency ensures that all nodes in the system agree on the most recent writes, at all times.

For example, if you have a bank system and a user transfers money from one account to another, the balance of the source account should be deducted and the balance of the destination account should be increased and all the nodes in the system should agree on this change. Otherwise, if a user tries to withdraw money from the original account, the system might not have the most recent data and the withdrawal operation might result in an invalid balance.

### Availability

Availability means that the system should always be available to process requests, even if some nodes in the system are down. In other words, the system should always respond to requests, even if some nodes are failing.

For example, if you are interacting with a social network and one of the servers is down, you should still be able to see a post created by another user. However, if this other user removed the post right before the server went down, you might still see the post because the remove operation was not replicated to the server that you are interacting with.

### Partition Tolerance

Partition tolerance means that the system should continue to operate even if the network is partitioned. That is, even if some nodes in the system are not able to communicate with each other, the system should still be able to process requests and respond to users.

For example, if you are using a chat application and you are in a place with a bad internet connection, you should still be able to send messages to other users. However, if the network is partitioned and you are not able to communicate with the server, the message should be delivered as soon as the network is restored.

## Implications of the CAP Theorem

The CAP theorem has important implications for distributed systems. Since it's impossible to achieve all three properties simultaneously, software engineers need to make trade-offs between consistency and availability when designing distributed systems.

In practice, most distributed systems choose to be partition-tolerant and to sacrifice either consistency or availability. For example, some systems choose to be available and partition-tolerant, sacrificing consistency. In this case, the system might return stale data to users, but it will always be available to process requests. Other systems choose to be consistent and partition-tolerant, sacrificing availability. In this case, the system might be unavailable if some nodes are down, but it will always return the most recent data to users.

### CP - Consistency and Partition Tolerance

Systems that choose to be consistent and partition-tolerant are called CP systems. These systems ensure that all nodes in the system have the same data at the same time, even if the network is partitioned. In other words, these systems prioritize consistency over availability. That means that if some nodes in the system are not able to communicate with each other, the system might be unavailable to process requests to prevent that inconsistent data is returned to users.

For example, withdrawing money from a bank account might fail if some nodes in the system are not able to communicate with each other. In this case, the system might be unavailable to prevent that the withdrawal operation is performed with stale data, which could result in an invalid balance.

### AP - Availability and Partition Tolerance

Systems that choose to be available and partition-tolerant are called AP systems. These systems ensure that the system is always available to process requests, even if some nodes in the system are down. In other words, these systems prioritize availability over consistency. That means that the system might return stale data to users, but it will always be available to process requests.

For example, commenting on a social network might succeed even if some nodes in the system are down. In this case, the comment might be lost if the node that received the comment is not able to communicate with the other nodes, but the system will always be available to process requests.

### CA - Consistency and Availability

Technically speaking, CA systems are not achievable in distributed systems. The reason is that if the network is partitioned, the system needs to choose between consistency and availability to continue to operate. That means that if the network is partitioned, the system needs to choose between returning stale data to users to be available or being unavailable to prevent that inconsistent data is returned to users.

## Conclusion

The CAP theorem, its different types and the trade-offs between the properties are important concepts for software engineers that design and implement distributed systems. Understanding the implications of the CAP theorem is crucial to make informed decisions when designing distributed systems and to ensure that the system behaves as expected in different scenarios.
