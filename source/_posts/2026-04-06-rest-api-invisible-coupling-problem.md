---
title: "REST API's Invisible Coupling Problem: Why You Can't Evolve What You Can't See"
excerpt: REST APIs default to returning everything, which creates invisible coupling between server and client. This makes API evolution risky because you never know which fields clients actually depend on.
date: "2026-04-06T12:00:00.000Z"
author: Bruno Krebs
tags: [api-design, rest, openapi, graphql]
---

Say you have a `GET /products` endpoint that returns 20 fields per product. A client calls it, gets back JSON with all 20 fields, parses 3 of them, and ignores the rest. Your server has no idea. As far as your API contract is concerned, the client might depend on any or all of those 20 fields.

Now try removing one. Or renaming it. Or changing its type from string to object. Yes, I know, breaking changes are always a problem, but in this scenario it is even _more_ problematic because you can't know for sure how often the field is being used.

You can't do it safely because you don't know what would break. So you don't touch it. The field stays, the payload grows, and your API quietly accumulates dead weight that nobody can prune.

This is REST's invisible coupling problem.

## The Spec Tells You What You Send, Not What They Need

Most REST APIs define their response schemas in an OpenAPI spec (or something equivalent). The spec describes exactly what the server returns for each endpoint. It's thorough, it's machine-readable, and it's great for generating clients and documentation.

But it only captures one side of the conversation. It tells you the shape of the response. It says nothing about which parts of that response any given client actually reads. You could have five consumers of the same endpoint, each using a different subset of fields, and the spec would look identical for all of them.

## The Contract Gap

In a traditional REST API, the response schema is the contract. If `GET /products` returns a `Product` object with 20 properties, that's 20 implicit promises. The client might use 3, but you've committed to all 20.

This creates an asymmetry:

- **The server** knows exactly what it sends (defined in the OpenAPI spec).
- **The client** knows exactly what it reads (defined in its own code).
- **Nobody** knows the intersection. The fields that are both sent *and* used.

That intersection is the real contract. Everything outside it is either waste or a hidden coupling risk.

## Versioning Doesn't Solve This

The instinct is to reach for API versioning. Version the endpoints, version the schemas, add `v2` prefixes, and manage the transition. But versioning only helps you *manage* breaking changes. It doesn't help you *identify* them.

If `v1` of your `Product` response has 20 fields and `v2` has 22, you still don't know which of the original 20 fields are actually consumed. You've just created a second shape that's equally opaque. Versioning gives you a mechanism to ship changes without breaking existing clients. It doesn't answer the question "is this field safe to change?"

You still need a way to know what's used.

## What GraphQL Got Right

GraphQL's most under-appreciated design decision isn't the query language or the type system. It's that clients *must* declare exactly which fields they want. There's no "give me everything." Every query is an explicit projection.

```graphql
query {
  products {
    id
    name
    price
  }
}
```

This query tells the server precisely what the client depends on. If nobody queries `warrantyTerms`, you know it's safe to deprecate. If everyone queries `price`, you know you can't touch it. The contract isn't implicit anymore. It's declared in every request.

This isn't just an optimization (though smaller payloads are nice). It's observability into your actual API surface. The server can track field-level usage across all clients, and API evolution becomes a data-driven decision rather than a guess.

## Can REST Do This?

Sort of. The closest REST equivalent is the `fields` query parameter pattern:

```
GET /products?fields=id,name,price
```

Microsoft's [API design guidelines](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design) mention this as "field selection for client-defined projections." The JSON:API spec calls it "sparse fieldsets." Google, Facebook, and others support variations of it.

But there's a key difference: in most REST APIs, field selection is *optional*. If you omit the `fields` parameter, you get everything. Which means most clients omit it, because why wouldn't they? It's easier to parse the full object and grab what you need than to maintain a list of fields in every request.

For field selection to actually solve the visibility problem, it would need to be *required*. Every request would need to declare which fields it wants, and the server would only return those fields.

That's technically possible, but it's unusual in REST and adds friction. Every new field a client needs requires a code change, even though the data might already be in the response if they just asked for everything.

You're essentially reimplementing one of GraphQL's core ideas on top of REST, without the ecosystem and tooling that makes it ergonomic.

## The Uncomfortable Middle Ground

So where does that leave a REST API that needs to evolve?

There's no perfect answer, but there are some practical moves:

**Intentional response shapes.** Instead of one giant `Product` object for every use case, define purpose-specific schemas: `ProductSummary` for list views, `ProductDetail` for single-resource fetches, `ProductInventory` for stock dashboards. Each shape is smaller and more intentional. You're still guessing what clients need, but at least you're guessing in smaller increments.

**Explicit deprecation with sunset timelines.** Mark fields as deprecated in your OpenAPI spec using the `deprecated` keyword. Publish sunset dates. Monitor for clients that still send or receive deprecated fields. This doesn't tell you what's used, but it creates a process for removing what isn't.

**Accept the coupling and version aggressively.** If you can't see the real contract, treat the full response as the contract. Version the API when you need to change it. Accept the overhead of maintaining multiple versions. It's the least elegant option, but it's honest about the constraints.

## Think About This Early

If you're building a REST API today and you think you'll need to evolve it later (you will), think about field-level visibility *now*. Not because you need to implement GraphQL-style projections on day one, but because the decisions you make about response shapes and client contracts will determine how much freedom you have later.

In practice, the answer is probably a mix: intentional response shapes where you can justify them, versioning where you can't, and maybe optional field selection for high-traffic endpoints where the usage data would be most valuable.

REST's defaults are generous. Your endpoint returns everything, your client parses what it wants, and it all works fine. Until you need to change something and realize you've been flying blind.
