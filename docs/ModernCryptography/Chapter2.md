Modern *random-number generation* proceeds in two steps. First, a "pool" of high-entropy data is collected. (For our purposes a formal definition of entropy is not needed, and it suffices to think of entropy as a measure of unpredictability.) Next, this high-entropy data is processed to yield a sequence of nearly independent and unbiased bits. This second step is necessary since high-entropy data is not necessarily uniform.

For example, suppose our high-entropy pool contains a sequence of *biased* bits, where 1 occurs with probability $p$ and 0 occurs with probability $1 - p$. A simple method extracts unbiased bits as follows: partition the bits into pairs, then if we see a 1 followed by a 0 we output 0, and if we see a 0 followed by a 1 we output 1. (If we see two 0s or two 1s in a row we output nothing, and simply move on to the next pair.) The probability that any pair results in a 0 is $p \cdot (1 - p)$, which is exactly equal to the probability that any pair results in a 1.

## 2.1 Definitions

An encryption scheme is defined by three algorithms $\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec}$, as well as a specification of a message space $\mathcal{M}$ with $|\mathcal{M}| > 1$.

1. **Message space $\mathcal{M}$.** The set of all valid messages, with requirement $|\mathcal{M}| > 1$.

2. **Key-generation algorithm $\mathsf{Gen}$.** A probabilistic algorithm that outputs a key $k$ chosen according to some distribution.

3. **Key space $\mathcal{K}$.** The finite set of all possible keys that can be output by $\mathsf{Gen}$.

4. **Encryption algorithm $\mathsf{Enc}$.**
   - Input: a key $k \in \mathcal{K}$ and a message $m \in \mathcal{M}$.
   - Output: a ciphertext $c$.
   - Property: explicitly allowed to be probabilistic; $\mathsf{Enc}_k(m)$ might output a different ciphertext when run multiple times.
   - Notation for probabilistic encryption: $c \leftarrow \mathsf{Enc}_k(m)$, denoting the possibly probabilistic process by which message $m$ is encrypted using key $k$ to give ciphertext $c$.
   - Notation for deterministic encryption: $c \coloneqq \mathsf{Enc}_k(m)$.

5. **Ciphertext space $\mathcal{C}$.** The set of all possible ciphertexts that can be output by $\mathsf{Enc}_k(m)$, for all possible choices of $k \in \mathcal{K}$ and $m \in \mathcal{M}$ (and for all random choices of $\mathsf{Enc}$ in case it is randomized).

6. **Decryption algorithm $\mathsf{Dec}$.**
   - Input: a key $k \in \mathcal{K}$ and a ciphertext $c \in \mathcal{C}$.
   - Output: a message $m \in \mathcal{M}$.
   - Under perfect correctness: we may assume $\mathsf{Dec}$ is deterministic without loss of generality, since $\mathsf{Dec}_k(c)$ must give the same output every time it is run.
   - Notation for decryption: $m \coloneqq \mathsf{Dec}_k(c)$, denoting the (deterministic) process of decrypting ciphertext $c$ using key $k$ to yield the message $m$.

7. **Perfect correctness.** For all $k \in \mathcal{K}$, $m \in \mathcal{M}$, and any ciphertext $c$ output by $\mathsf{Enc}_k(m)$, it holds that $\Pr\left[\mathsf{Dec}_k(c) = m\right] = 1$.

8. **Uniform sampling notation convention.** $x \leftarrow S$ denotes uniform selection of $x$ from a set $S$.

We let $K$ be the random variable denoting the value of the key output by $\mathsf{Gen}$; thus, for any $k \in \mathcal{K}$, $\Pr[K = k]$ denotes the probability that the key output by $\mathsf{Gen}$ is equal to $k$. Similarly, we let $M$ be the random variable denoting the message being encrypted, so $\Pr[M = m]$ denotes the probability that the message takes on the value $m \in \mathcal{M}$.

**DEFINITION 2.3.** An encryption scheme $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ with message space $\mathcal{M}$ is *perfectly secret* if for every probability distribution for $M$, every message $m \in \mathcal{M}$, and every ciphertext $c \in \mathcal{C}$ for which $\Pr[C = c] > 0$:

$$\Pr[M = m \mid C = c] = \Pr[M = m].$$

**LEMMA 2.5.** An encryption scheme $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ with message space $\mathcal{M}$ is perfectly secret if and only if Equation (2.1) holds:

For every $m, m' \in \mathcal{M}$, and every $c \in \mathcal{C}$, we have

$$\Pr[\mathsf{Enc}_K(m) = c] = \Pr[\mathsf{Enc}_K(m') = c].$$

**The adversarial indistinguishability experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}$:**

1. The adversary $\mathcal{A}$ outputs a pair of messages $m_0, m_1 \in \mathcal{M}$.

2. A key $k$ is generated using $\mathsf{Gen}$, and a uniform bit $b \in \{0, 1\}$ is chosen. Ciphertext $c \leftarrow \mathsf{Enc}_k(m_b)$ is computed and given to $\mathcal{A}$. We refer to $c$ as the *challenge ciphertext*.

3. $\mathcal{A}$ outputs a bit $b'$.

4. The output of the experiment is defined to be 1 if $b' = b$, and 0 otherwise. We write $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi} = 1$ if the output of the experiment is 1 and in this case we say that $\mathcal{A}$ succeeds.

**DEFINITION 2.6.** Encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ with message space $\mathcal{M}$ is *perfectly indistinguishable* if for every $\mathcal{A}$ it holds that

$$\Pr\left[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi} = 1\right] = \frac{1}{2}.$$

The following lemma states that Definition 2.6 is equivalent to Definition 2.3.

**LEMMA 2.7.** Encryption scheme $\Pi$ is perfectly secret if and only if it is perfectly indistinguishable.

## 2.2 The One-Time Pad

We let $a \oplus b$ denote the bitwise exclusive-or (XOR) of two equal-length binary strings $a$ and $b$. That is, if $a = a_1 a_2 \cdots a_\ell$ and $b = b_1 b_2 \cdots b_\ell$ are $\ell$-bit strings, then $a \oplus b$ is the $\ell$-bit string given by $(a_1 \oplus b_1)(a_2 \oplus b_2) \cdots (a_\ell \oplus b_\ell)$. In the one-time pad encryption scheme the key is a uniform string of the same length as the message, and the ciphertext is computed by simply XORing the key and the message; a formal definition is given as Construction 2.9. Before discussing security, we first verify correctness: for every key $k$ and every message $m$ it holds that $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = k \oplus k \oplus m = m$, and so the one-time pad constitutes a valid encryption scheme.

**THEOREM 2.10.** The one-time pad encryption scheme is perfectly secret.

## 2.3 Limitation of Perfect Secrecy

**THEOREM 2.11.** If $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ is a perfectly secret encryption scheme with message space $\mathcal{M}$ and key space $\mathcal{K}$, then $|\mathcal{K}| \geq |\mathcal{M}|$.

## 2.4 Shannon's Theorem

**THEOREM 2.12** (Shannon's theorem). Let $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ be an encryption scheme with message space $\mathcal{M}$, for which $|\mathcal{M}| = |\mathcal{K}| = |\mathcal{C}|$. The scheme is perfectly secret if and only if:

1. Every key $k \in \mathcal{K}$ is chosen with (equal) probability $1/|\mathcal{K}|$ by $\mathsf{Gen}$.

2. For every $m \in \mathcal{M}$ and every $c \in \mathcal{C}$, there is a unique key $k \in \mathcal{K}$ such that $\mathsf{Enc}_k(m)$ outputs $c$.
