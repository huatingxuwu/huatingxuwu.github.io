## 3.5 Constructing a CPA-Secure Encryption Scheme

### 3.5.1 Pseudorandom Functions and Permutations

A keyed function $F : \{0, 1\}^* \times \{0, 1\}^* \rightarrow \{0, 1\}^*$ is a two-input function, where the first input is called the *key* and typically denoted by $k$. We say $F$ is *efficient* if there is a polynomial-time algorithm that computes $F(k, x)$ given $k$ and $x$.

In typical usage a key $k \in \{0, 1\}^n$ is chosen and fixed, and we are then interested in the single-input function $F_k : \{0, 1\}^n \rightarrow \{0, 1\}^n$ defined by $F_k(x) \stackrel{\text{def}}{=} F(k, x)$ mapping $n$-bit input strings to $n$-bit output strings.

The size of $\mathsf{Func}_n$ is exactly the number of strings of length $n \cdot 2^n$; that is, $|\mathsf{Func}_n| = 2^{n \cdot 2^n}$.

**DEFINITION 3.24.** An efficient, length-preserving, keyed function $F : \{0, 1\}^* \times \{0, 1\}^* \rightarrow \{0, 1\}^*$ is a *pseudorandom function* if for all probabilistic polynomial-time distinguishers $D$, there is a negligible function $\mathsf{negl}$ such that:

$$\left| \Pr\left[ D^{F_k(\cdot)}(1^n) = 1 \right] - \Pr\left[ D^{f(\cdot)}(1^n) = 1 \right] \right| \le \mathsf{negl}(n),$$

where the first probability is taken over uniform choice of $k \in \{0, 1\}^n$ and the randomness of $D$, and the second probability is taken over uniform choice of $f \in \mathsf{Func}_n$ and the randomness of $D$.

**Pseudorandom functions and pseudorandom generators.** It is fairly easy to construct a pseudorandom generator $G$ from a pseudorandom function $F$ by simply evaluating $F$ on a series of distinct inputs; e.g.,

$$G(s) \stackrel{\text{def}}{=} F_s(1) \parallel F_s(2) \parallel \cdots \parallel F_s(\ell),$$

We can define this for any desired $\ell$.

**Pseudorandom Permutations.** We call $F$ a keyed permutation if $\ell_{\text{in}} = \ell_{\text{out}}$, and furthermore for all $k \in \{0, 1\}^{\ell_{\text{key}}(n)}$ the function $F_k : \{0, 1\}^{\ell_{\text{in}}(n)} \rightarrow \{0, 1\}^{\ell_{\text{in}}(n)}$ is one-to-one. We call $\ell_{\text{in}}$ the block length of $F$. A keyed permutation is efficient if there is a polynomial-time algorithm for computing $F_k(x)$ given $k$ and $x$, as well as a polynomial-time algorithm for computing $F_k^{-1}(y)$ given $k$ and $y$. That is, $F_k$ should be both efficiently computable and efficiently invertible given $k$.

We can equally well define a pseudorandom permutation by requiring that no efficient algorithm can distinguish between access to $F_k$ (for uniform key $k$) and access to $f$ (for uniform $f \in \mathsf{Func}_n$).

**PROPOSITION 3.26.** If $F$ is a pseudorandom permutation for which $\ell_{\text{in}}(n) \ge n$, then $F$ is also a pseudorandom function.

**DEFINITION 3.27.** Let $F : \{0, 1\}^* \times \{0, 1\}^* \rightarrow \{0, 1\}^*$ be an efficient, length-preserving, keyed permutation. $F$ is a *strong pseudorandom permutation* if for all probabilistic polynomial-time distinguishers $D$, there exists a negligible function $\mathsf{negl}$ such that:

$$\left| \Pr\left[ D^{F_k(\cdot), F_k^{-1}(\cdot)}(1^n) = 1 \right] - \Pr\left[ D^{f(\cdot), f^{-1}(\cdot)}(1^n) = 1 \right] \right| \le \mathsf{negl}(n),$$

where the first probability is taken over uniform choice of $k \in \{0, 1\}^n$ and the randomness of $D$, and the second probability is taken over uniform choice of $f \in \mathsf{Perm}_n$ and the randomness of $D$.

### 3.5.2 CPA-Security from a Pseudorandom Function

![[Encryption_with_function.png|400]]

**CONSTRUCTION 3.28.** Let $F$ be a pseudorandom function. Define a fixed-length, private-key encryption scheme for messages of length $n$ as follows:

- **Gen**: on input $1^n$, choose uniform $k \in \{0, 1\}^n$ and output it.

- **Enc**: on input a key $k \in \{0, 1\}^n$ and a message $m \in \{0, 1\}^n$, choose uniform $r \in \{0, 1\}^n$ and output the ciphertext
  $$c := \langle r, F_k(r) \oplus m \rangle.$$

- **Dec**: on input a key $k \in \{0, 1\}^n$ and a ciphertext $c = \langle r, s \rangle$, output the message
  $$m := F_k(r) \oplus s.$$

A CPA-secure encryption scheme from any pseudorandom function.

**THEOREM 3.29.** If $F$ is a pseudorandom function, then Construction 3.28 is a CPA-secure, fixed-length private-key encryption scheme for messages of length $n$.

**Concrete security.** The above proof shows that

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{cpa}}(n) = 1\right] \le \frac{1}{2} + \frac{q(n)}{2^n} + \mathsf{negl}(n)$$

for some negligible function $\mathsf{negl}$. The final term depends on the security of $F$ as a pseudorandom function.

## 3.6 Modes of Operation and Encryption in Practice

### 3.6.1 Stream Ciphers

Formally, a stream cipher is a pair of deterministic algorithms $(\mathsf{Init}, \mathsf{Next})$ where:

- **Init** takes as input a seed $s$ and an optional *initialization vector* $IV$, and outputs some initial state $\mathsf{st}$.

- **Next** takes as input a current state $\mathsf{st}$ and outputs a bit $y$ along with updated state $\mathsf{st}'$.

We define an algorithm $\mathsf{GetBits}$ that takes as input an initial state $\mathsf{st}_0$ and a desired output length $1^\ell$ (specified in unary, since $\mathsf{GetBits}$ runs in time linear in $\ell$) and then does:

1. For $i = 1$ to $\ell$, compute $(y_i, \mathsf{st}_i) := \mathsf{Next}(\mathsf{st}_{i-1})$.

2. Return the $\ell$-bit string $y = y_1 \cdots y_\ell$ as well as the final state $\mathsf{st}_\ell$.

We let $\mathsf{GetBits}_1$ be the algorithm that runs $\mathsf{GetBits}$ and only returns its initial output.

Formally, given a stream cipher $(\mathsf{Init}, \mathsf{Next})$ and a parameter $\ell = \ell(n) > n$, we may define the deterministic function $G^\ell$ as

$$G^\ell(s) \stackrel{\text{def}}{=} \mathsf{GetBits}_1(\mathsf{Init}(s), 1^\ell).$$

Then the stream cipher is *secure* if $G^\ell$ is a pseudorandom generator for any polynomial $\ell$.

Formally, given a stream cipher $(\mathsf{Init}, \mathsf{Next})$ (where $\mathsf{Init}$ takes an $n$-bit $IV$) and a parameter $\ell = \ell(n)$, we may define the keyed function $F^\ell : \{0, 1\}^n \times \{0, 1\}^n \rightarrow \{0, 1\}^\ell$ as

$$F^\ell_s(IV) \stackrel{\text{def}}{=} \mathsf{GetBits}_1(\mathsf{Init}(s, IV), 1^\ell).$$

Then the stream cipher is *secure* if $F^\ell$ is a pseudorandom function for any polynomial $\ell$.

**CONSTRUCTION 3.30.** Let $F$ be a pseudorandom function. Define a stream cipher $(\mathsf{Init}, \mathsf{Next})$ as follows, where $\mathsf{Init}$ accepts a $3n/4$-bit initialization vector and $\mathsf{Next}$ outputs $n$ bits in each call:

- **Init**: on input $s \in \{0, 1\}^n$ and $IV \in \{0, 1\}^{3n/4}$, output $\mathsf{st} = (s, IV, 0)$.

- **Next**: on input $\mathsf{st} = (s, IV, i)$, output $y := F_s(IV \parallel \langle i \rangle)$ and updated state $\mathsf{st}' = (s, IV, i + 1)$.

### 3.6.2 Stream-Cipher Modes of Operation

**Synchronized mode.** To encrypt a series of messages from a sender $S$ to a receiver $R$:

1. Both parties call $\mathsf{Init}(k)$ to obtain the same initial state $\mathsf{st}_0$.

2. Let $\mathsf{st}_S$ be the current state of $S$. If $S$ wants to encrypt a message $m$, it computes $(y, \mathsf{st}'_S) := \mathsf{GetBits}(\mathsf{st}_S, 1^{|m|})$, sends $c := m \oplus y$ to the receiver, and updates its local state to $\mathsf{st}'_S$.

3. Let $\mathsf{st}_R$ be the current state of $R$. When $R$ receives a ciphertext $c$ from the sender, it computes $(y, \mathsf{st}'_R) := \mathsf{GetBits}(\mathsf{st}_R, 1^{|c|})$, outputs the message $m := c \oplus y$, and updates its own local state to $\mathsf{st}'_R$.

The above is an example of *stateful* encryption where the sender and receiver are required to maintain state between the encryption/decryption of different messages. The stream cipher does not need to use an IV. Also note that there is no ciphertext expansion.

**Unsynchronized mode.**

**CONSTRUCTION 3.31.** Let $(\mathsf{Init}, \mathsf{Next})$ be a stream cipher that takes an $n$-bit $IV$. Define a private-key encryption scheme for arbitrary-length messages as follows:

- **Gen**: on input $1^n$, choose a uniform $k \in \{0, 1\}^n$ and output it.

- **Enc**: on input a key $k \in \{0, 1\}^n$ and a message $m \in \{0, 1\}^*$, choose uniform $IV \in \{0, 1\}^n$, and output the ciphertext
  $$\big\langle IV,\ \mathsf{GetBits}_1\big(\mathsf{Init}(k, IV), 1^{|m|}\big) \oplus m \big\rangle.$$

- **Dec**: on input a key $k \in \{0, 1\}^n$ and a ciphertext $\langle IV, c \rangle$, output the message
  $$m := \mathsf{GetBits}_1\big(\mathsf{Init}(k, IV), 1^{|c|}\big) \oplus c.$$

### 3.6.3 Block Ciphers and Block-Cipher Modes of Operation

A block cipher $F : \{0, 1\}^n \times \{0, 1\}^\ell \rightarrow \{0, 1\}^\ell$ is a keyed function such that, for all $k$, the function $F_k$ defined by $F_k(x) \stackrel{\text{def}}{=} F(k, x)$ is a bijection.

**Electronic Code Book (ECB) mode.**

![[ECB_mode.png|400]]
![[dangers_of_ECB.png|400]]

ECB mode is *deterministic* and therefore cannot be CPA-secure. Worse, ECB-mode encryption is not even EAV-secure.

**Cipher Block Chaining (CBC) mode.**

![[CBC_mode.png|400]]

A uniform initialization vector ($IV$) of length $n$ is first chosen as the initial ciphertext block. Set $c_0 := IV$ and then, for $i = 1$ to $\ell$, set $c_i := F_k(c_{i-1} \oplus m_i)$. The final ciphertext is $c_0, c_1, \dots, c_\ell$. Decryption of a ciphertext $c_0, \dots, c_\ell$ is done by computing $m_i := F_k^{-1}(c_i) \oplus c_{i-1}$ for $i = 1, \dots, \ell$.

**THEOREM 3.32.** If $F$ is a pseudorandom permutation, then CBC mode is CPA-secure.

The main drawback of CBC mode is that encryption must be carried out *sequentially*.

![[Chained_CBC_mode.png|400]]

*Chained CBC mode* — in which the last block of the previous ciphertext is used as the $IV$ when encrypting the next message.

Chained CBC mode is vulnerable to a chosen-plaintext attack. The basis of the attack is that the adversary knows *in advance* the "initialization vector" $c_3$ that will be used for the second encrypted message.

**Output Feedback (OFB) mode.**

![[OFB_mode.png|400]]

First a uniform $IV \in \{0, 1\}^n$ is chosen. Then, a pseudorandom stream is generated from $IV$ in the following way: Define $y_0 := IV$, and set the $i$-th block $y_i$ of the stream to be $y_i := F_k(y_{i-1})$. Each block of the plaintext is then encrypted by XORing it with the appropriate block of the stream; that is, $c_i := y_i \oplus m_i$.

Here it is not required that $F$ be invertible. (In fact, it need not even be a permutation.) Furthermore, as in stream-cipher modes of operation, here it is not necessary for the plaintext length to be a multiple of the block length $n$; instead, the generated stream can be truncated to exactly the plaintext length. Another advantage of OFB mode is that its stateful variant (in which the final value $y_\ell$ is used as the $IV$ for encrypting the next message, and is not sent) *is* secure.

This mode has the advantage relative to CBC mode that the bulk of the computation can be done independently of the actual message to be encrypted. That is, it is possible to generate a pseudorandom stream ahead of time using preprocessing, after which encryption of the plaintext (once it is known) is incredibly fast.

**Counter (CTR) mode.**

![[CTR_mode.png|400]]

To encrypt a message with $\ell < 2^{n/4}$ blocks using CTR mode, a uniform $IV \in \{0, 1\}^{3n/4}$ is first chosen. Then, a pseudorandom stream is generated by computing $y_i := F_k(IV \parallel \langle i \rangle)$ for $i = 1, 2, \dots$, where the counter $i$ is encoded as an $n/4$-bit string. The $i$-th ciphertext block is computed as $c_i := y_i \oplus m_i$.

As with OFB mode—another "stream-cipher" mode—the generated stream can be truncated to exactly the plaintext length, and preprocessing can be used to generate the pseudorandom stream before the message is known.

CTR mode has the advantage that encryption and decryption can be fully *parallelized*, since all the blocks of the pseudorandom stream can be computed independently of each other.

**THEOREM 3.33.** If $F$ is a pseudorandom function, then CTR mode is CPA-secure for multiple encryptions.

**Practical Considerations.**

**Block length and concrete security.** The block length of a block cipher thus has a significant impact on the concrete security of encryption schemes based on that cipher.

We remark further that the proof of security for CTR mode given above assumes $F$ is a pseudorandom function, but in practice $F$ would be instantiated by a block cipher that is a pseudorandom permutation. Although every pseudorandom permutation $F$ (with sufficiently large block length $n$) is also a pseudorandom function, using a pseudorandom permutation incurs a concrete-security loss of roughly $b^2/2^n$ where $b$ denotes the number of invocations of $F$ overall.

**IV misuse.** If an $IV$ repeats: for the "stream-cipher modes" (OFB and CTR), a repeated $IV$ can be catastrophic. With CBC mode, one expects in practice that although some information is leaked when an $IV$ repeats, the inputs to the block cipher in the two encryptions using the same $IV$ will "diverge" after only a few plaintext blocks, and so the attacker will get no information about the plaintext blocks after that point.

If a scheme does not choose a *uniform* $IV$: CTR mode remains secure in this case, as the proof of security only requires that an $IV$ never repeats. CBC mode, on the other hand, is no longer secure, as we have already discussed in the context of chained CBC mode.

**Message tampering.** With regard to the behavior of different modes in the presence of "benign" (i.e., non-adversarial) transmission errors, in general such errors can be addressed using standard non-cryptographic techniques (e.g., error correction or re-transmission).

### 3.6.4 Nonce-Based Encryption

**DEFINITION 3.34.** A *nonce-based (private-key) encryption scheme* consists of probabilistic polynomial-time algorithms $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ such that:

1. $\mathsf{Gen}$ takes as input $1^n$ and outputs a key $k$ with $|k| \ge n$.

2. $\mathsf{Enc}$ takes as input a key $k$, a nonce $\mathsf{nonce} \in \{0, 1\}^*$, and a message $m \in \{0, 1\}^*$, and outputs a ciphertext $c$.

3. $\mathsf{Dec}$ takes as input a key $k$, a nonce $\mathsf{nonce} \in \{0, 1\}^*$, and a ciphertext $c$, and outputs a message $m \in \{0, 1\}^*$ or $\bot$.

We require that for every $n$, every $k$ output by $\mathsf{Gen}(1^n)$, every $\mathsf{nonce} \in \{0, 1\}^*$, and every $m \in \{0, 1\}^*$, it holds that $\mathsf{Dec}_k(\mathsf{nonce}, \mathsf{Enc}_k(\mathsf{nonce}, m)) = m$.

**The nonce-based LR-oracle experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{LR\text{-}ncpa}}(n)$:**

1. A key $k$ is generated by running $\mathsf{Gen}(1^n)$.

2. A uniform bit $b \in \{0, 1\}$ is chosen.

3. The adversary $\mathcal{A}$ is given $1^n$ and oracle access to $\mathsf{LR}_{k,b}(\cdot, \cdot, \cdot)$. The adversary is not allowed to repeat the first input in any of its queries to the oracle.

4. The adversary $\mathcal{A}$ outputs a bit $b'$.

5. The output of the experiment is defined to be $1$ if $b' = b$, in which case we say that $\mathcal{A}$ succeeds.

**DEFINITION 3.35.** A nonce-based private-key encryption scheme $\Pi$ is CPA-secure for multiple encryptions if for all probabilistic polynomial-time adversaries $\mathcal{A}$ there is a negligible function $\mathsf{negl}$ such that

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{LR\text{-}ncpa}}(n) = 1\right] \le \frac{1}{2} + \mathsf{negl}(n),$$

where the probability is taken over the randomness used by $\mathcal{A}$ and the randomness used in the experiment.

**Advantages of nonce-based encryption.** First of all, CPA-secure nonce-based encryption is useful in settings where generating high-quality randomness is expensive or impossible. Somewhat similarly, there may be settings where using a *short* nonce is appropriate. Finally, we have already observed that tighter concrete-security bounds can sometimes be obtained by enforcing non-repeating nonces rather than by choosing a uniform nonce.
