---
title: "Cryptography 101: Understanding the Basics"
excerpt: "This blog post introduces the fundamentals of cryptography, breaking down its two primary forms: symmetric and asymmetric. We explain how each type secures data, highlight key algorithms like AES, RSA, and ECC, and demonstrate their applications in real-world security protocols such as TLS. The post also covers cryptographic techniques including block ciphers and key exchanges, with a focus on the Diffie-Hellman example for establishing secure communications."
date: "2017-02-15T17:42:38.123Z"
author: "Bruno Krebs"
tags: ["cryptography", "security", "programming"]
---

## Introduction to Cryptography
### What is Cryptography?
Cryptography is the art and science of securing communication and data in the presence of adversaries. It involves techniques for encrypting and decrypting information, increasing the chances that only authorized parties can access the data and understand its contents. This field of study covers a range of applications, from securing online transactions to protecting sensitive communication across open networks.
### Importance of Cryptography in Modern Technology
In today's digital age, cryptography is indispensable. It protects sensitive data from hackers, preserves privacy in online communications, and secures financial transactions across the Internet. With the increasing frequency of cyberattacks and data breaches, effective cryptographic techniques are crucial for maintaining the integrity and confidentiality of digital information. It ensures that our digital interactions remain private and that our data is shielded from unauthorized access and alterations.


## Types of Cryptography
### Symmetric Cryptography
#### What is Symmetric Cryptography?
Symmetric cryptography is a type of encryption where the same key is used for both encrypting and decrypting data. This key must be shared between the sender and receiver securely and kept secret from others. The main advantage of symmetric cryptography is its speed, making it ideal for encrypting large volumes of data efficiently.
#### Common Algorithms: AES, DES
Some of the most widely used symmetric cryptographic algorithms include AES (Advanced Encryption Standard) and DES (Data Encryption Standard). AES is known for its strong security and efficiency and has become the industry standard for secure communications. DES, though older and less secure, was one of the first major symmetric algorithms and laid the groundwork for modern cryptography.
#### Applications of Symmetric Cryptography
Symmetric encryption is extensively used in various applications where data security is crucial. These include securing file storage systems, encrypting database information, and protecting data transmitted over secure connections, like HTTPS. Its efficiency and speed make it suitable for real-time data encryption and large-scale operations that require quick processing times.

> Note: even though symmetric algorithms are used to transmit data on web transactions, they are not used to transmit the key itself. Modern web browsers use asymmetric cryptography to securely exchange symmetric keys for data encryption.

### Asymmetric Cryptography
#### What is Asymmetric Cryptography?
Asymmetric cryptography, also known as public key cryptography, uses two different keys for encryption and decryption. These keys are called the public key and the private key. The public key can be shared with anyone, while the private key must be kept secret by the owner. This method allows secure communication even where a secure channel for key exchange isn't available because, to encrypt data, you only need the recipient's public key. That is, the public key is used for encryption (writing data), and the private key is used for decryption (reading data).
#### Common Algorithms: RSA, ECC
Two of the most prevalent algorithms in asymmetric cryptography are RSA (Rivest-Shamir-Adleman) and ECC (Elliptic Curve Cryptography). RSA is widely used for secure data transmission and is known for its robust security, relying on the computational difficulty of factoring large prime numbers. ECC offers similar levels of security with smaller key sizes, making it more efficient in terms of processing power and bandwidth.
#### Applications of Asymmetric Cryptography
Asymmetric cryptography is fundamental for digital signatures, secure key exchange, and encrypting small amounts of data. It's crucial in scenarios like SSL/TLS communications for secure websites, email encryption, and identity verification in various security protocols. Its ability to provide secure communications without prior key exchange makes it invaluable for internet-scale deployments.

## Understanding Cryptographic Techniques
### Block Ciphers
#### Role in Symmetric Cryptography
Block ciphers play a crucial role in symmetric cryptography as they encrypt fixed-size blocks of data using a secret key. This method ensures data confidentiality by transforming plaintext blocks into encrypted ciphertext. Block ciphers are the foundation of many encryption standards, providing the flexibility to handle various data sizes and security requirements.
#### Operating Modes: ECB, CBC, etc.
Block ciphers operate in several modes, each offering different security features and use cases. The most common modes include ECB (Electronic Codebook) and CBC (Cipher Block Chaining). ECB is straightforward but less secure, as identical plaintext blocks result in identical ciphertext blocks. CBC improves security by XORing each plaintext block with the previous ciphertext block before encryption, ensuring that identical plaintexts produce different ciphertexts when the initial vector (IV) is varied.
### Key Exchanges
#### Why We Need Key Exchanges
Key exchange mechanisms are essential in cryptography to securely distribute cryptographic keys among parties over an unsecured network. They enable the secure initiation of communication by allowing parties to agree on a shared secret that can be used to encrypt subsequent communications, without the need to transmit the secret key directly.
#### Diffie-Hellman Example
The Diffie-Hellman algorithm is one of the earliest practical examples of key exchange protocols. It allows two parties, each having a public-private key pair, to establish a shared secret over an insecure channel. This is achieved by both parties exchanging their public keys and then using their private keys to compute the shared secret, which can then be used to encrypt further communications. This method does not require prior sharing of secret keys, making it highly effective and secure for digital communications.

## Cryptography in Use: TLS Protocol
### What is TLS?
TLS, or Transport Layer Security, is a widely adopted security protocol designed to provide privacy and data integrity between two communicating applications. It's the most commonly used protocol for securing internet traffic, ensuring that data transmitted over networks is safe from eavesdropping and tampering. TLS is the successor to SSL (Secure Sockets Layer) and is used by millions of websites around the globe to protect online transactions between users and servers, making it fundamental to modern web security.
### How TLS Uses Cryptography
#### Asymmetric Cryptography for Key Exchange
In the TLS protocol, asymmetric cryptography is primarily used for the key exchange phase. During this stage, TLS utilizes public key encryption methods, such as RSA or ECC, to securely exchange the keys needed for symmetric encryption. This ensures that even if the communication channel is compromised, the encryption keys remain secure.
#### Symmetric Cryptography for Data Transmission
Once the keys are exchanged securely using asymmetric cryptography, TLS switches to symmetric encryption for the bulk of data transmission. This switch is due to the higher efficiency of symmetric algorithms, which are better suited for encrypting large amounts of data transmitted during a session. Common symmetric encryption algorithms used in TLS include AES and ChaCha20.
#### Role of Digital Signatures
#### Role of Digital Signatures
Digital signatures are a cryptographic technique used to verify the authenticity and integrity of digital messages or documents. A digital signature, not to be confused with a handwritten signature, is created using a public key algorithm such as RSA, ECDSA, or DSA. The process involves generating a hash (a mathematical summary) of the message or document and then encrypting this hash with the signer's private key. The result is a digital signature that is unique to both the document and the key used.
In the context of TLS, digital signatures serve multiple critical functions. They are used during the TLS handshake to authenticate the communicating parties and to verify that the content has not been altered since it was signed. This authentication process helps prevent man-in-the-middle attacks, where an attacker could intercept or alter communications. By checking the digital signature against the public key provided by the certificate (which should be issued by a trusted certificate authority), clients can confirm the identity of the server they are connecting to, and vice versa. This step is essential in establishing a trusted connection and ensuring that both parties are who they claim to be.

## Conclusion
In this blog post, we've explored the essential basics of cryptography, distinguishing between symmetric and asymmetric cryptography and their respective uses. We discussed popular cryptographic algorithms like AES and RSA and delved into cryptographic techniques such as block ciphers and key exchanges. Additionally, we covered how TLS protocol utilizes these cryptographic methods to ensure secure data transmission through digital signatures, and the essential role of asymmetric and symmetric cryptography in modern secure communications.
