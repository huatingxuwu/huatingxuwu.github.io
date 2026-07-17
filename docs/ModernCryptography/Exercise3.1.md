### 3.1
#### Question 
Prove Proposition 3.6.

**PROPOSITION 3.6.** Let $\mathsf{negl}_1$ and $\mathsf{negl}_2$ be negligible functions. Then,

1. The function $\mathsf{negl}_3(n) = \mathsf{negl}_1(n) + \mathsf{negl}_2(n)$ is negligible.
2. For any polynomial $p$, the function $\mathsf{negl}_4(n) = p(n) \cdot \mathsf{negl}_1(n)$ is negligible.
#### Solution
**Definition:** A function $f(n)$ is negligible if for every positive polynomial $p(n)$, there exists an integer $N$ such that for all $n > N$,

$$|f(n)| < \frac{1}{p(n)}$$

**Proof of Part 1.**

Let $p(n)$ be any arbitrary positive polynomial. We want to show that there exists an $N_3$ such that for all $n > N_3$, $|\mathsf{negl}_3(n)| < \frac{1}{p(n)}$.

Consider the polynomial $2 \cdot p(n)$. Since $\mathsf{negl}_1$ and $\mathsf{negl}_2$ are negligible functions, by definition:

1. For the polynomial $2 \cdot p(n)$, there exists an $N_1$ such that for all $n > N_1$:
    
    $$|\mathsf{negl}_1(n)| < \frac{1}{2 \cdot p(n)}$$
    
2. For the same polynomial $2 \cdot p(n)$, there exists an $N_2$ such that for all $n > N_2$:
    
    $$|\mathsf{negl}_2(n)| < \frac{1}{2 \cdot p(n)}$$
    

Let $N_3 = \max(N_1, N_2)$. Then for all $n > N_3$, both bounds hold simultaneously. Using the triangle inequality, we have:

$$|\mathsf{negl}_3(n)| = |\mathsf{negl}_1(n) + \mathsf{negl}_2(n)| \le |\mathsf{negl}_1(n)| + |\mathsf{negl}_2(n)|$$

Substituting the bounds for $n > N_3$:

$$|\mathsf{negl}_3(n)| < \frac{1}{2 \cdot p(n)} + \frac{1}{2 \cdot p(n)} = \frac{1}{p(n)}$$

Thus, $\mathsf{negl}_3(n)$ is negligible. $\blacksquare$

**Proof of Part 2.**

Let $p(n)$ be any polynomial, and let $q(n)$ be an arbitrary positive polynomial. We need to show that there exists an $N_4$ such that for all $n > N_4$, $|p(n) \cdot \mathsf{negl}_1(n)| < \frac{1}{q(n)}$.

Without loss of generality, we can assume $p(n) > 0$ for sufficiently large $n$ (if $p(n) \le 0$, its absolute value can be upper-bounded by a positive polynomial anyway).

Define a new polynomial $r(n) = p(n) \cdot q(n)$. Since the product of two polynomials is also a polynomial, $r(n)$ is a valid polynomial.

Since $\mathsf{negl}_1$ is a negligible function, by definition, for the polynomial $r(n)$, there exists an integer $N_4$ such that for all $n > N_4$:

$$|\mathsf{negl}_1(n)| < \frac{1}{r(n)} = \frac{1}{p(n) \cdot q(n)}$$

Multiplying both sides by $|p(n)|$ (for $n > N_4$ where $p(n) > 0$):

$$|p(n)| \cdot |\mathsf{negl}_1(n)| < |p(n)| \cdot \frac{1}{p(n) \cdot q(n)} = \frac{1}{q(n)}$$

Since $|p(n) \cdot \mathsf{negl}_1(n)| = |p(n)| \cdot |\mathsf{negl}_1(n)|$, we have:

$$|\mathsf{negl}_4(n)| < \frac{1}{q(n)}$$

Thus, $\mathsf{negl}_4(n)$ is negligible. $\blacksquare$

### 3.2

#### Question
Prove that Definition 3.8 cannot be satisfied if $\Pi$ can encrypt arbitrary-length messages and the adversary is _not_ restricted to outputting equal-length messages in experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}$.
#### Solution

We will show that if an adversary can choose two messages of different lengths, they can successfully guess which message was encrypted with a probability significantly higher than $\frac{1}{2}$, thereby breaking EAV-security.

**1. Constructing the Adversary $\mathcal{A}$:**

Let $q(n)$ be the polynomial bounding the maximum length of a ciphertext when encrypting a 1-bit message using the scheme $\Pi$.

We design a probabilistic polynomial-time (PPT) adversary $\mathcal{A}$ for the experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n)$ as follows:

1. $\mathcal{A}$ selects and outputs two messages of different lengths:
    
    - $m_0 \in \{0, 1\}$ (a single bit, so $|m_0| = 1$)
        
    - $m_1 \in \{0, 1\}^{q(n)+2}$ (a string of length $q(n)+2$)
        
2. The experiment picks a random bit $b \in \{0, 1\}$, computes the challenge ciphertext $c \leftarrow \mathsf{Enc}_k(m_b)$, and gives $c$ to $\mathcal{A}$.
    
3. Upon receiving $c$, $\mathcal{A}$ measures the bit-length of the ciphertext, $|c|$:
    
    - If $|c| \le q(n)$, $\mathcal{A}$ outputs $b' = 0$.
        
    - If $|c| > q(n)$, $\mathcal{A}$ outputs $b' = 1$.
        

**2. Analyzing the Success Probability:**

We analyze the probability $\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1] = \Pr[b' = b]$ by breaking it into two cases based on the choice of $b$:

- **Case 1: $b = 0$**
    
    The encryption scheme encrypts $m_0$, which is a single bit. By definition of $q(n)$, the maximum size of a ciphertext for a single-bit message is $q(n)$. Therefore, $|c| \le q(n)$ is always true.
    
    $$\Pr[b' = 0 \mid b = 0] = 1$$
    
- **Case 2: $b = 1$**
    
    The encryption scheme encrypts $m_1$, which has a length of $q(n)+2$. Because encryption must be decryptable (injective mapping from plaintext to ciphertext space for any given key), the ciphertext must contain enough information to recover the plaintext. Therefore, the number of possible ciphertexts must be at least the number of possible plaintexts.
    
    Since $|m_1| = q(n)+2$, there are $2^{q(n)+2}$ possible plaintexts. However, the maximum number of distinct binary ciphertexts of length $q(n)$ or less is:
    
    $$\sum_{i=0}^{q(n)} 2^i = 2^{q(n)+1} - 1 < 2^{q(n)+2}$$
    
    By the Pigeonhole Principle, at most $2^{q(n)+1} - 1$ of the plaintexts can map to a ciphertext of length $\le q(n)$. Thus, the probability that a randomly chosen $m_1$ results in a ciphertext $c$ where $|c| \le q(n)$ is strictly upper-bounded:
    
    $$\Pr[|c| \le q(n) \mid b = 1] \le \frac{2^{q(n)+1} - 1}{2^{q(n)+2}} < \frac{1}{2}$$
    
    Consequently, the probability that $\mathcal{A}$ correctly guesses $b'=1$ is:
    
    $$\Pr[b' = 1 \mid b = 1] = 1 - \Pr[|c| \le q(n) \mid b = 1] > 1 - \frac{1}{2} = \frac{1}{2}$$
    

**3. Conclusion:**

Using the law of total probability:

$$\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1] = \frac{1}{2}\Pr[b'=0 \mid b=0] + \frac{1}{2}\Pr[b'=1 \mid b=1]$$

$$\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1] > \frac{1}{2}(1) + \frac{1}{2}\left(\frac{1}{2}\right) = \frac{3}{4}$$

Since $\frac{3}{4} = \frac{1}{2} + \frac{1}{4}$, the adversary's advantage is $\frac{1}{4}$, which is a constant and cannot be upper-bounded by any negligible function $\mathsf{negl}(n)$ for large $n$. Thus, Definition 3.8 cannot be satisfied. $\blacksquare$

### 3.3
#### Question
 Say $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ is such that for $k \in \{0, 1\}^n$, algorithm $\mathsf{Enc}_k$ is only defined for messages of length at most $\ell(n)$ (for some polynomial $\ell$). Construct a scheme satisfying Definition 3.8 even when the adversary is _not_ restricted to outputting equal-length messages in $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}$.

#### Solution

To prevent the adversary from exploiting ciphertext length differences (as demonstrated in Exercise 3.2), we can modify an existing EAV-secure scheme to hide the message length by padding all plaintexts to their maximum allowable length $\ell(n)$ before encryption.

**1. Construction of the Modified Scheme $\Pi' = (\mathsf{Gen}', \mathsf{Enc}', \mathsf{Dec}')$:**

Let $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ be an encryption scheme that is EAV-secure under the standard restriction where the adversary _must_ output equal-length messages. Assume its message space contains bit strings of length up to $\ell(n)$. We define $\Pi'$ as follows:

- $\mathsf{Gen}'(1^n)$: Output $k \leftarrow \mathsf{Gen}(1^n)$.
    
- $\mathsf{Enc}'_k(m)$: Given a message $m \in \{0, 1\}^*$ with length $|m| \le \ell(n)$:
    
    1. Pad $m$ to exactly length $\ell(n)$ by appending a '1' followed by enough '0's. That is, $m_{\text{padded}} = m \mathbin{\Vert} 1 \mathbin{\Vert} 0^{\ell(n) - |m| - 1}$. (If $|m| = \ell(n)$, we assume $\ell(n)$ is sized such that a standard reversible parsing or a dedicated length-tag indicator fits, or simply pad up to a fixed polynomial $\ell(n)+1$).
        
    2. Output $c \leftarrow \mathsf{Enc}_k(m_{\text{padded}})$.
        
- $\mathsf{Dec}'_k(c)$: Compute $m_{\text{padded}} \leftarrow \mathsf{Dec}_k(c)$, then strip the trailing padding bytes to recover and output $m$.
    

**2. Proof of Security:**

Let $\mathcal{A}'$ be an unrestricted PPT adversary attacking $\Pi'$ in the experiment $\mathsf{PrivK}_{\mathcal{A}',\Pi'}^{\mathsf{eav}}(n)$. $\mathcal{A}'$ chooses two messages $m_0, m_1$ where $|m_0| \le \ell(n)$ and $|m_1| \le \ell(n)$, but potentially $|m_0| \neq |m_1|$.

We construct a standard restricted PPT adversary $\mathcal{A}$ that attacks the underlying scheme $\Pi$:

1. $\mathcal{A}$ runs $\mathcal{A}'(1^n)$ to receive $m_0$ and $m_1$.
    
2. $\mathcal{A}$ computes the padded versions:
    
    $$m_0^* = \text{pad}(m_0) \quad \text{and} \quad m_1^* = \text{pad}(m_1)$$
    
    By construction, both $m_0^*$ and $m_1^*$ have identical lengths: $|m_0^*| = |m_1^*| = \ell(n)$.
    
3. $\mathcal{A}$ outputs $(m_0^*, m_1^*)$ as its own challenge messages in the standard experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n)$.
    
4. $\mathcal{A}$ receives a challenge ciphertext $c$ (which is an encryption of $m_b^*$ under $\Pi$).
    
5. $\mathcal{A}$ passes $c$ directly to $\mathcal{A}'$.
    
6. When $\mathcal{A}'$ outputs a bit $b'$, $\mathcal{A}$ outputs the same bit $b'$.
    

**Analysis:**

Because $m_0^*$ and $m_1^*$ have identical lengths, $\mathcal{A}$ is a valid adversary for the standard EAV experiment of $\Pi$. By the definition of the experiment setup:

$$\Pr[\mathsf{PrivK}_{\mathcal{A}',\Pi'}^{\mathsf{eav}}(n) = 1] = \Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1]$$

Since the base scheme $\Pi$ is EAV-secure under the equal-length restriction, there exists a negligible function $\mathsf{negl}(n)$ such that:

$$\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1] \le \frac{1}{2} + \mathsf{negl}(n)$$

Therefore:

$$\Pr[\mathsf{PrivK}_{\mathcal{A}',\Pi'}^{\mathsf{eav}}(n) = 1] \le \frac{1}{2} + \mathsf{negl}(n)$$

This proves that $\Pi'$ satisfies EAV-security even when the adversary can choose messages of different lengths. $\blacksquare$

### 3.4
#### Question
Prove the equivalence of Definition 3.8 and Definition 3.9.

**DEFINITION 3.8.** A private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ has indistinguishable encryptions in the presence of an eavesdropper, or is EAV-secure, if for all probabilistic polynomial-time adversaries $\mathcal{A}$ there is a negligible function $\mathsf{negl}$ such that, for all $n$,

> $$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] \le \frac{1}{2} + \mathsf{negl}(n).$$

**DEFINITION 3.9.** A private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ has indistinguishable encryptions in the presence of an eavesdropper if for all PPT adversaries $\mathcal{A}$ there is a negligible function $\mathsf{negl}$ such that

> $$\left| \Pr\left[\mathsf{out}_{\mathcal{A}}(\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n, 0)) = 1\right] - \Pr\left[\mathsf{out}_{\mathcal{A}}(\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n, 1)) = 1\right] \right| \le \mathsf{negl}(n).$$

#### Solution

To establish equivalence, we look at how the total success probability in Definition 3.8 relates to the individual case probabilities in Definition 3.9.

In the experiment for Definition 3.8, a uniform bit $b \in \{0, 1\}$ is chosen. The adversary outputs a guess $b'$. The experiment outputs $1$ (adversary wins) if $b' = b$. Using the notation from Definition 3.9, let $P_0 = \Pr[b'=1 \mid b=0]$ and $P_1 = \Pr[b'=1 \mid b=1]$.

By the law of total probability:

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \Pr[b'=0 \mid b=0]\Pr[b=0] + \Pr[b'=1 \mid b=1]\Pr[b=1]$$

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2}(1 - P_0) + \frac{1}{2}P_1 = \frac{1}{2} + \frac{1}{2}(P_1 - P_0)$$

**Part 1: Definition 3.9 $\implies$ Definition 3.8.**

Assume Definition 3.9 holds. Then for any PPT adversary $\mathcal{A}$, there is a negligible function $\mathsf{negl}_1$ such that $|P_0 - P_1| \le \mathsf{negl}_1(n)$. This implies $P_1 - P_0 \le \mathsf{negl}_1(n)$.

Substituting this into our expanded success probability equation:

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P_1 - P_0) \le \frac{1}{2} + \frac{1}{2}\mathsf{negl}_1(n)$$

By Proposition 3.6, $\mathsf{negl}(n) = \frac{1}{2}\mathsf{negl}_1(n)$ is a negligible function. Thus, Definition 3.8 holds.

**Part 2: Definition 3.8 $\implies$ Definition 3.9.**

Assume Definition 3.8 holds for all PPT adversaries. Suppose for contradiction that Definition 3.9 does not hold. Then there exists a PPT adversary $\mathcal{A}$ and a non-negligible function $\epsilon(n)$ such that for infinitely many values of $n$:

$$|P_1 - P_0| > \epsilon(n)$$

This leaves two possible cases for infinitely many $n$:

- **Case A ($P_1 - P_0 > \epsilon(n)$):**
    
    Directly substituting this into our equation gives:
    
    $$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P_1 - P_0) > \frac{1}{2} + \frac{1}{2}\epsilon(n)$$
    
    Since $\frac{1}{2}\epsilon(n)$ is non-negligible, this immediately violates Definition 3.8.
    
- **Case B ($P_0 - P_1 > \epsilon(n)$):**
    
    We can construct a modified adversary $\mathcal{A}'$ that runs $\mathcal{A}$ but flips its final output bit (i.e., if $\mathcal{A}$ outputs $1$, $\mathcal{A}'$ outputs $0$, and vice versa). For this new adversary, its probabilities are $P'_0 = 1 - P_0$ and $P'_1 = 1 - P_1$.
    
    Calculating the success probability for $\mathcal{A}'$:
    
    $$\Pr\left[\mathsf{PrivK}_{\mathcal{A}',\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P'_1 - P'_0) = \frac{1}{2} + \frac{1}{2}(P_0 - P_1) > \frac{1}{2} + \frac{1}{2}\epsilon(n)$$
    
    This also violates Definition 3.8 because $\mathcal{A}'$ is a valid PPT adversary.
    

Thus, Definition 3.8 implies Definition 3.9. Both definitions are equivalent. $\blacksquare$


### 3.5
#### Question
Define $G(s) \overset{\text{def}}{=} s \mathbin{\Vert} s$ (where "$\Vert$" denotes concatenation). Describe and analyze an attack showing that $G$ is not a pseudorandom generator.

#### Solution

A function $G: \{0,1\}^n \to \{0,1\}^{2n}$ is a pseudorandom generator (PRG) if no PPT distinguisher $D$ can distinguish between the output of $G(s)$ for a uniform seed $s \in \{0,1\}^n$ and a truly uniform string $w \in \{0,1\}^{2n}$ with non-negligible advantage.

**1. Constructing the Distinguisher $D$:**

Given an input string $x \in \{0,1\}^{2n}$, $D$ splits $x$ into two equal halves of length $n$, such that $x = x_L \mathbin{\Vert} x_R$ where $x_L, x_R \in \{0,1\}^n$.

The distinguisher $D$ behaves as follows:

1. Compare $x_L$ and $x_R$.
    
2. If $x_L = x_R$, output $1$ (predicting that $x$ is pseudorandom).
    
3. If $x_L \neq x_R$, output $0$ (predicting that $x$ is truly random).
    

**2. Analyzing the Distinguishing Advantage:**

We analyze the output of $D$ under the two different distributions:

- **Case 1: Input is from the PRG distribution ($x = G(s)$ for uniform $s \in \{0,1\}^n$)**
    
    By definition of $G$, $x = s \mathbin{\Vert} s$. Thus, $x_L = s$ and $x_R = s$. It is always true that $x_L = x_R$.
    
    $$\Pr_{s \leftarrow \{0,1\}^n}[D(G(s)) = 1] = 1$$
    
- **Case 2: Input is from the truly uniform distribution ($x = w$ for uniform $w \in \{0,1\}^{2n}$)**
    
    When $w$ is picked uniformly at random, its first $n$ bits $w_L$ and its last $n$ bits $w_R$ are chosen independently and uniformly. The probability that two independent, uniform $n$-bit strings are identical is exactly $1/2^n$.
    
    $$\Pr_{w \leftarrow \{0,1\}^{2n}}[D(w) = 1] = \Pr[w_L = w_R] = \frac{1}{2^n}$$
    

**3. Conclusion:**

The distinguishing advantage of $D$ is defined as:

$$\text{Adv}_G(D) = \left| \Pr_{s \leftarrow \{0,1\}^n}[D(G(s)) = 1] - \Pr_{w \leftarrow \{0,1\}^{2n}}[D(w) = 1] \right| = 1 - \frac{1}{2^n}$$

For any security parameter $n \ge 1$, the advantage $1 - \frac{1}{2^n} \ge \frac{1}{2}$, which is a constant and not negligible. Therefore, $G$ is not a pseudorandom generator. $\blacksquare$

### 3.6
#### Question
Let $G$ be a pseudorandom generator. In each of the following cases, say whether $G'$ is necessarily a pseudorandom generator. If yes, give a proof; if not, show a counterexample.

(a) Define $G'(s) \overset{\text{def}}{=} G(\bar{s})$, where $\bar{s}$ is the complement of $s$.

(b) Define $G'(s) \overset{\text{def}}{=} \overline{G(s)}$.

(c) Define $G'(s) \overset{\text{def}}{=} G(0^{|s|} \mathbin{\Vert} s)$.

(d) Define $G'(s) \overset{\text{def}}{=} G(s) \mathbin{\Vert} G(s+1)$.

#### Solution

Let $G: \{0,1\}^n \to \{0,1\}^{\ell(n)}$ be a PRG with expansion factor $\ell(n) > n$.

**(a) $G'(s) = G(\bar{s})$ — **YES, it is necessarily a PRG.**.**

**Proof:** We use a reduction argument. Suppose there exists a PPT distinguisher $D'$ that breaks the pseudorandomness of $G'$. We can construct a PPT distinguisher $D$ that breaks the pseudorandomness of $G$.

When $D$ receives a challenge string $x \in \{0,1\}^{\ell(n)}$, it directly passes $x$ to $D'$ and outputs whatever $D'$ outputs: $D(x) = D'(x)$.

- If $x$ is a truly uniform string $w \leftarrow \{0,1\}^{\ell(n)}$, the input distribution to $D'$ is identical to its random challenge case:
    
    $$\Pr[D(w) = 1] = \Pr[D'(w) = 1]$$
    
- If $x = G(s)$ for a uniform seed $s \leftarrow \{0,1\}^n$, notice that since $s$ is chosen uniformly at random, its bitwise complement $\bar{s}$ is also distributed perfectly uniformly over $\{0,1\}^n$. Thus, the distribution of $G(s)$ is identical to the distribution of $G(\bar{s}) = G'(s)$. Therefore:
    
    $$\Pr[D(G(s)) = 1] = \Pr[D'(G(\bar{s})) = 1] = \Pr[D'(G'(s)) = 1]$$
    

The distinguishing advantage of $D$ is:

$$\left| \Pr[D(G(s)) = 1] - \Pr[D(w) = 1] \right| = \left| \Pr[D'(G'(s)) = 1] - \Pr[D'(w) = 1] \right|$$

Since $G$ is a secure PRG, this advantage must be negligible, which implies $D'$'s advantage is also negligible. Thus, $G'$ is a PRG. $\blacksquare$

**(b) $G'(s) = \overline{G(s)}$ — **YES, it is necessarily a PRG.**.**

**Proof:** Suppose there is a PPT distinguisher $D'$ that breaks $G'$. We build a PPT distinguisher $D$ to break $G$.

When $D$ receives a challenge string $x \in \{0,1\}^{\ell(n)}$, it computes $\bar{x}$ (the bitwise complement of $x$) and feeds $\bar{x}$ to $D'$. It outputs $D(x) = D'(\bar{x})$.

- If $x = G(s)$, then $\bar{x} = \overline{G(s)} = G'(s)$. Thus:
    
    $$\Pr[D(G(s)) = 1] = \Pr[D'(G'(s)) = 1]$$
    
- If $x = w$ is a truly uniform string, its bitwise complement $\bar{w}$ is also a perfectly uniform string over $\{0,1\}^{\ell(n)}$. Thus:
    
    $$\Pr[D(w) = 1] = \Pr[D'(\bar{w}) = 1] = \Pr[D'(w) = 1]$$
    

Therefore, $D$'s advantage against $G$ is identical to $D'$'s advantage against $G'$. Since $G$ is secure, $G'$ must be secure. $\blacksquare$

**(c) $G'(s) = G(0^{|s|} \mathbin{\Vert} s)$ — **NO, it is not necessarily a PRG.**.**

**Counterexample:** Suppose a secure PRG $G_1: \{0,1\}^{2n} \to \{0,1\}^{3n}$ exists. We construct a modified function $G$ as follows:

- If the input $x \in \{0,1\}^{2n}$ starts with $n$ zeros (i.e., $x = 0^n \mathbin{\Vert} s$), $G(x) = 0^{3n}$.
    
- For all other inputs, $G(x) = G_1(x)$.
    

$G$ is still a secure PRG because the fraction of inputs starting with $n$ zeros is $\frac{1}{2^n}$, which is negligible; a PPT distinguisher hits this edge case with negligible probability when $x$ is chosen uniformly.

However, if we use this valid PRG $G$ to form $G'(s) = G(0^n \mathbin{\Vert} s)$, then for _any_ seed $s$, the input to $G$ always starts with $n$ zeros. By our construction:

$$G'(s) = 0^{3n}$$

A string of all zeros can be trivially distinguished from a random string with an advantage of $1 - \frac{1}{2^{3n}}$, so $G'$ is not a PRG. $\blacksquare$

**(d) $G'(s) = G(s) \mathbin{\Vert} G(s+1)$ — **NO, it is not necessarily a PRG.**.**

**Counterexample:** Suppose a secure PRG $G_1: \{0,1\}^n \to \{0,1\}^{\ell(n)}$ exists. We construct a new PRG $G$ whose input length is $n+1$ bits. For a seed $x = s \mathbin{\Vert} b$ where $s \in \{0,1\}^n$ and $b \in \{0,1\}$:

$$G(s \mathbin{\Vert} b) = G_1(s) \mathbin{\Vert} b$$

$G$ is a valid PRG because it simply appends a single random bit $b$ to the output of a secure PRG $G_1$.

Now, let's look at $G'(x) = G(x) \mathbin{\Vert} G(x+1)$ for an input $x = s \mathbin{\Vert} 0$.

- $x = s \mathbin{\Vert} 0$
    
- $x + 1 = s \mathbin{\Vert} 1$
    

Applying our definition of $G$:

$$G(x) = G_1(s) \mathbin{\Vert} 0$$

$$G(x+1) = G_1(s) \mathbin{\Vert} 1$$

Concatenating them gives:

$$G'(x) = G_1(s) \mathbin{\Vert} 0 \mathbin{\Vert} G_1(s) \mathbin{\Vert} 1$$

A distinguisher can easily break $G'$ by checking if the first half (minus its last bit) equals the second half (minus its last bit). In $G'(x)$, these two segments are both $G_1(s)$ and will match with $100\%$ probability, whereas in a random string they will match with negligible probability $\frac{1}{2^{\ell(n)-1}}$. Thus, $G'$ is not a PRG. $\blacksquare$

### 3.7

#### Question
Let $|G(s)| = \ell(|s|)$ for some $\ell$. Consider the following experiment:

**The PRG indistinguishability experiment $\mathsf{PRG}_{\mathcal{A},G}(n)$:**

(a) A uniform bit $b \in \{0, 1\}$ is chosen. If $b = 0$ then choose a uniform $r \in \{0, 1\}^{\ell(n)}$; if $b = 1$ then choose a uniform $s \in \{0, 1\}^n$ and set $r := G(s)$.

(b) The adversary $\mathcal{A}$ is given $r$, and outputs a bit $b'$.

(c) The output of the experiment is defined to be $1$ if $b' = b$, and $0$ otherwise.

Provide a definition of a pseudorandom generator based on this experiment, and prove that your definition is equivalent to Definition 3.14. (That is, show that $G$ satisfies your definition if and only if it satisfies Definition 3.14.)

#### Solution

**1. New Definition based on the Experiment.**

**Definition 3.14':** A deterministic polynomial-time algorithm $G$ is a pseudorandom generator if $\ell(n) > n$ for all $n$, and for any PPT adversary $\mathcal{A}$, there exists a negligible function $\mathsf{negl}$ such that:

$$\Pr\left[\mathsf{PRG}_{\mathcal{A},G}(n) = 1\right] \le \frac{1}{2} + \mathsf{negl}(n)$$

**2. Equivalence Proof.**

Let $P_{\text{pseudo}} = \Pr[b'=1 \mid b=1] = \Pr_{s \leftarrow \{0,1\}^n}[\mathcal{A}(G(s)) = 1]$ and $P_{\text{random}} = \Pr[b'=1 \mid b=0] = \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[\mathcal{A}(r) = 1]$.

By the law of total probability, the total success probability in our experiment is:

$$\Pr\left[\mathsf{PRG}_{\mathcal{A},G}(n) = 1\right] = \Pr[b'=0 \mid b=0]\Pr[b=0] + \Pr[b'=1 \mid b=1]\Pr[b=1]$$

$$\Pr\left[\mathsf{PRG}_{\mathcal{A},G}(n) = 1\right] = \frac{1}{2}(1 - P_{\text{random}}) + \frac{1}{2}P_{\text{pseudo}} = \frac{1}{2} + \frac{1}{2}(P_{\text{pseudo}} - P_{\text{random}})$$

**Part 1.**: Definition 3.14 $\implies$ Definition 3.14'

Assume $G$ satisfies Definition 3.14. Then for any PPT adversary $\mathcal{A}$ (acting as the distinguisher $D$), there is a negligible function $\mathsf{negl}_1$ such that:

$$|P_{\text{pseudo}} - P_{\text{random}}| \le \mathsf{negl}_1(n) \implies P_{\text{pseudo}} - P_{\text{random}} \le \mathsf{negl}_1(n)$$

Substituting this inequality into the total success probability expansion:

$$\Pr\left[\mathsf{PRG}_{\mathcal{A},G}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P_{\text{pseudo}} - P_{\text{random}}) \le \frac{1}{2} + \frac{1}{2}\mathsf{negl}_1(n)$$

By Proposition 3.6, $\mathsf{negl}(n) = \frac{1}{2}\mathsf{negl}_1(n)$ is negligible. Thus, Definition 3.14' is satisfied.

**Part 2.**: Definition 3.14' $\implies$ Definition 3.14

Assume $G$ satisfies Definition 3.14'. Suppose for contradiction that it does not satisfy Definition 3.14. Then there exists a PPT distinguisher $D$ and a non-negligible function $\epsilon(n)$ such that for infinitely many $n$:

$$| \Pr[D(G(s))=1] - \Pr[D(r)=1] | = |P_{\text{pseudo}} - P_{\text{random}}| > \epsilon(n)$$

- **Case A ($P_{\text{pseudo}} - P_{\text{random}} > \epsilon(n)$):** We construct an adversary $\mathcal{A}$ that runs $D$ directly. Then:
    
    $$\Pr\left[\mathsf{PRG}_{\mathcal{A},G}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P_{\text{pseudo}} - P_{\text{random}}) > \frac{1}{2} + \frac{1}{2}\epsilon(n)$$
    
    Since $\frac{1}{2}\epsilon(n)$ is non-negligible, this violates Definition 3.14'.
    
- **Case B ($P_{\text{random}} - P_{\text{pseudo}} > \epsilon(n)$):** We construct an adversary $\mathcal{A}'$ that runs $D$ but flips its final output bit ($1 \to 0$ and $0 \to 1$). For $\mathcal{A}'$, the new probabilities are $P'_{\text{pseudo}} = 1 - P_{\text{pseudo}}$ and $P'_{\text{random}} = 1 - P_{\text{random}}$.
    
    $$\Pr\left[\mathsf{PRG}_{\mathcal{A}',G}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}(P'_{\text{pseudo}} - P'_{\text{random}}) = \frac{1}{2} + \frac{1}{2}(P_{\text{random}} - P_{\text{pseudo}}) > \frac{1}{2} + \frac{1}{2}\epsilon(n)$$
    
    This also violates Definition 3.14'.
    

Thus, Definition 3.14' implies Definition 3.14. Both definitions are equivalent. $\blacksquare$


### 3.8

#### Question
Prove the converse of Theorem 3.16. Namely, show that if $G$ is not a pseudorandom generator then Construction 3.17 does not have indistinguishable encryptions in the presence of an eavesdropper.

**THEOREM 3.16.** If $G$ is a pseudorandom generator, then Construction 3.17 is an EAV-secure, fixed-length private-key encryption scheme for messages of length $\ell(n)$.

**CONSTRUCTION 3.17.** Let $G$ be a pseudorandom generator with expansion factor $\ell(n)$. Define a fixed-length private-key encryption scheme for messages of length $\ell(n)$ as follows:

- **Gen:** on input $1^n$, choose uniform $k \in \{0, 1\}^n$ and output it as the key.
- **Enc:** on input a key $k \in \{0, 1\}^n$ and a message $m \in \{0, 1\}^{\ell(n)}$, output the ciphertext $c := G(k) \oplus m$.
- **Dec:** on input a key $k \in \{0, 1\}^n$ and a ciphertext $c \in \{0, 1\}^{\ell(n)}$, output the message $m := G(k) \oplus c$.
#### Solution

We will use a proof by reduction. We assume $G$ is not a pseudorandom generator, which means there exists a PPT distinguisher $D$ that can distinguish between the output of $G(k)$ and a truly random string with non-negligible advantage. We will build a PPT eavesdropping adversary $\mathcal{A}$ that uses $D$ to break the EAV-security of Construction 3.17.

**1. Given Hypothesis:**

Since $G$ is not a PRG, there exists a PPT distinguisher $D$ and a non-negligible function $\epsilon(n)$ such that for infinitely many $n$:

$$\left| \Pr_{k \leftarrow \{0,1\}^n}[D(G(k)) = 1] - \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[D(r) = 1] \right| > \epsilon(n)$$

Without loss of generality, we can assume that $D$ outputs $1$ more often when given a pseudorandom string:

$$\Pr_{k \leftarrow \{0,1\}^n}[D(G(k)) = 1] - \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[D(r) = 1] > \epsilon(n)$$

(If it were the other way around, we could simply invert the output bit of $D$).

**2. Construction of Adversary $\mathcal{A}$:**

We design the EAV adversary $\mathcal{A}$ for the experiment $\mathsf{PrivK}_{\mathcal{A}, \Pi}^{\mathsf{eav}}(n)$ as follows:

1. $\mathcal{A}$ selects and outputs two distinct challenge messages: $m_0 = 0^{\ell(n)}$ (the all-zeros string) and $m_1 \in \{0,1\}^{\ell(n)}$ chosen uniformly at random.
    
2. The experiment chooses a random bit $b \in \{0,1\}$ and returns the challenge ciphertext $c = G(k) \oplus m_b$.
    
3. Upon receiving $c$, $\mathcal{A}$ feeds $c$ directly into the PRG distinguisher $D$.
    
4. If $D(c) = 1$, $\mathcal{A}$ outputs $b' = 0$. Otherwise, if $D(c) = 0$, $\mathcal{A}$ outputs $b' = 1$.
    

**3. Success Probability Analysis:**

We break down the probability that $\mathcal{A}$ guesses correctly ($\text{b' = b}$):

- **Case 1: $b = 0$**
    
    The ciphertext is $c = G(k) \oplus m_0 = G(k) \oplus 0^{\ell(n)} = G(k)$. Thus, $c$ is exactly the output of the generator $G(k)$ for a random key $k$.
    
    $$\Pr[b' = 0 \mid b = 0] = \Pr_{k \leftarrow \{0,1\}^n}[D(G(k)) = 1]$$
    
- **Case 2: $b = 1$**
    
    The ciphertext is $c = G(k) \oplus m_1$. Since $m_1$ is chosen uniformly at random from $\{0,1\}^{\ell(n)}$, the bitwise XOR of any string $G(k)$ with a truly uniform random string $m_1$ results in a distribution that is perfectly uniform over $\{0,1\}^{\ell(n)}$. Thus, $c$ behaves exactly like a truly random string $r$.
    
    $$\Pr[b' = 1 \mid b = 1] = \Pr_{c \leftarrow \{0,1\}^{\ell(n)}}[D(c) = 0] = 1 - \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[D(r) = 1]$$
    

Using the law of total probability, the total success probability of $\mathcal{A}$ is:

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2}\Pr[b'=0 \mid b=0] + \frac{1}{2}\Pr[b'=1 \mid b=1]$$

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2}\Pr_{k \leftarrow \{0,1\}^n}[D(G(k)) = 1] + \frac{1}{2}\left(1 - \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[D(r) = 1]\right)$$

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] = \frac{1}{2} + \frac{1}{2}\left(\Pr_{k \leftarrow \{0,1\}^n}[D(G(k)) = 1] - \Pr_{r \leftarrow \{0,1\}^{\ell(n)}}[D(r) = 1]\right)$$

Substituting our PRG non-negligible advantage condition into this formula yields:

$$\Pr\left[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n) = 1\right] > \frac{1}{2} + \frac{1}{2}\epsilon(n)$$

Since $\frac{1}{2}\epsilon(n)$ is a non-negligible function, the adversary $\mathcal{A}$ breaks EAV-security. Thus, Construction 3.17 is not secure if $G$ is not a PRG. $\blacksquare$

### 3.9

#### Question
 Consider a notion of indistinguishable encryption for multiple _distinct_ messages, i.e., where a scheme need not hide whether the same message is encrypted twice.

(a) Modify Definition 3.18 to obtain a suitable definition of the above.

(b) Show that Construction 3.17 does not satisfy your definition.

(c) Give a construction of a _deterministic_ (stateless) encryption scheme that satisfies your definition.

#### Solution

**(a) Definition Modification.**

Definition 3.18 relies on the experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{mult}}(n)$, where the adversary outputs two vectors of messages, $\vec{M}_0 = (m_{0,1}, \dots, m_{0,t})$ and $\vec{M}_1 = (m_{1,1}, \dots, m_{1,t})$. To relax the definition so that it only protects vectors consisting of pairwise _distinct_ elements, we add a syntactic constraint to the experiment.

**Definition 3.18'**: An encryption scheme $\Pi$ has indistinguishable multiple encryptions for _distinct_ messages if for all PPT adversaries $\mathcal{A}$, there is a negligible function $\mathsf{negl}$ such that $\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{dist-mult}}(n) = 1] \le \frac{1}{2} + \mathsf{negl}(n)$, where the experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{dist-mult}}(n)$ is identical to $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{mult}}(n)$ except that the adversary $\mathcal{A}$ is required to output two message vectors $\vec{M}_0 = (m_{0,1}, \dots, m_{0,t})$ and $\vec{M}_1 = (m_{1,1}, \dots, m_{1,t})$ such that:

1. $|m_{0,i}| = |m_{1,i}|$ for all $i \in \{1, \dots, t\}$.
    
2. The elements within $\vec{M}_0$ are pairwise distinct ($m_{0,i} \neq m_{0,j}$ for all $i \neq j$).
    
3. The elements within $\vec{M}_1$ are pairwise distinct ($m_{1,i} \neq m_{1,j}$ for all $i \neq j$).
    

**(b) Vulnerability of Construction 3.17.**

Recall that Construction 3.17 defines $\mathsf{Enc}_k(m) = G(k) \oplus m$. Since it is a stateless, deterministic stream cipher using a fixed key stream $G(k)$, encrypting multiple messages reveals linear relationships between them.

We can break this scheme in the $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{dist-mult}}(n)$ setting with $t=3$ distinct messages.

1. $\mathcal{A}$ selects and outputs:
    
    - $\vec{M}_0 = (m_{0,1}, m_{0,2}, m_{0,3})$ where $m_{0,1} = 0^{\ell(n)}$, $m_{0,2} = 1^{\ell(n)}$, and $m_{0,3} = 0^{\ell(n)-1}1$.
        
    - $\vec{M}_1 = (m_{1,1}, m_{1,2}, m_{1,3})$ where $m_{1,1} = 0^{\ell(n)}$, $m_{1,2} = 1^{\ell(n)}$, and $m_{1,3} = 10^{\ell(n)-1}$.
        
        _(Note that both vectors contain entirely pairwise distinct messages)._
        
2. $\mathcal{A}$ receives the challenge ciphertexts $\vec{C} = (c_1, c_2, c_3) = (G(k) \oplus m_{b,1}, G(k) \oplus m_{b,2}, G(k) \oplus m_{b,3})$.
    
3. $\mathcal{A}$ computes:
    
    $$c_1 \oplus c_3 = (G(k) \oplus m_{b,1}) \oplus (G(k) \oplus m_{b,3}) = m_{b,1} \oplus m_{b,3}$$
    
4. If $c_1 \oplus c_3 = m_{0,1} \oplus m_{0,3} = 0^{\ell(n)-1}1$, $\mathcal{A}$ outputs $b'=0$. Otherwise, it outputs $b'=1$.
    

Since $m_{0,1} \oplus m_{0,3} \neq m_{1,1} \oplus m_{1,3}$, $\mathcal{A}$ correctly guesses $b$ with probability $1$. This breaks the security definition. $\blacksquare$

**(c) Construction of a Deterministic Scheme.**

To satisfy security for multiple _distinct_ messages deterministically, the ciphertexts must not leak linear correlations. We can achieve this by using a Pseudorandom Permutation (PRP), which acts as a strong block cipher.

Let $F: \{0,1\}^n \times \{0,1\}^n \to \{0,1\}^n$ be a secure PRP. We define a deterministic scheme $\Pi' = (\mathsf{Gen}', \mathsf{Enc}', \mathsf{Dec}')$ for $n$-bit messages:

- **Gen':** Choose a uniform key $k \in \{0, 1\}^n$.
    
- **Enc':** Given message $m \in \{0, 1\}^n$, output $c := F_k(m)$.
    
- **Dec':** Given ciphertext $c \in \{0, 1\}^n$, output $m := F_k^{-1}(c)$.
    

**Security Analysis Idea:**

Since $F_k$ is a PRP, evaluating it on a sequence of pairwise distinct inputs $(m_{b,1}, \dots, m_{b,t})$ yields a sequence of outputs $(c_1, \dots, c_t)$ that are pairwise distinct. By the PRP assumption, this sequence is computationally indistinguishable from a sequence of distinct tokens chosen uniformly at random from $\{0,1\}^n$. Because a random sequence of distinct values gives no information about whether it corresponds to $\vec{M}_0$ or $\vec{M}_1$, any PPT adversary has only a negligible advantage. $\blacksquare$

### 3.10

#### Question
Prove _unconditionally_ the existence of a pseudorandom function $F : \{0, 1\}^* \times \{0, 1\}^* \rightarrow \{0, 1\}$ with $\ell_{\text{key}}(n) = n$ and $\ell_{in}(n) = \log n$.

**Hint:** Implement a _uniform_ function with logarithmic input length.

#### Solution

**1. Definition of the Function**

Let the key length be $\ell_{\text{key}}(n) = n$ and the input length be $\ell_{in}(n) = \log n$.

The total number of possible inputs of length $\log n$ is $2^{\log n} = n$.

We can view a key $k \in \{0, 1\}^n$ as an $n$-bit string, where each bit corresponds to the output of a unique input $x \in \{0, 1\}^{\log n}$. Specifically, let $\text{int}(x) \in \{0, 1, \dots, n-1\}$ be the integer value of the binary string $x$. We define the function $F$ as:

$$F_k(x) = k_{\text{int}(x) + 1}$$

where $k_i$ denotes the $i$-th bit of the key $k$.

**2. Uniform Distribution (Perfect Randomness)**

If the key $k$ is chosen uniformly at random from $\{0, 1\}^n$, every bit $k_i$ is an independent and uniformly distributed random bit.

Since every distinct input $x \in \{0, 1\}^{\log n}$ maps to a distinct bit in the key $k$, the function $F_k$ acts exactly like a truly random function from $\{0, 1\}^{\log n}$ to $\{0, 1\}$. That is, for any sequence of distinct inputs $x_1, x_2, \dots, x_q$, the outputs $F_k(x_1), F_k(x_2), \dots, F_k(x_q)$ are completely independent and uniformly random bits.

**3. Unconditional Security Analysis**

A distinguisher $D$ is given oracle access to either $F_k$ (where $k \leftarrow \{0,1\}^n$) or a truly random function $f: \{0, 1\}^{\log n} \rightarrow \{0, 1\}$.

Since the distribution of the function $F_k$ is identical to the distribution of a truly random function $f$, the view of any distinguisher $D$ (regardless of its computational complexity or the number of queries it makes) is identical in both scenarios.

Therefore, the advantage of any distinguisher $D$ is exactly zero:

$$\left| \Pr[D^{F_k(·)}(1^n) = 1] - \Pr[D^{f(·)}(1^n) = 1] \right| = 0$$

Since this holds without assuming any unproven cryptographic hardness assumptions (like $P \neq NP$ or the existence of one-way functions), the existence of this pseudorandom function is proven **unconditionally**.

### 3.11

#### Question
 Let $F$ be a length-preserving pseudorandom function. For the following constructions of a keyed function $F' : \{0, 1\}^n \times \{0, 1\}^{n-1} \rightarrow \{0, 1\}^{2n}$, state whether $F'$ is a pseudorandom function. If yes, prove it; if not, show an attack.

(a) $F'_k(x) \overset{\text{def}}{=} F_k(0 \Vert{} x) \Vert{} F_k(0 \Vert{} x)$.

(b) $F'_k(x) \overset{\text{def}}{=} F_k(0 \Vert{} x) \Vert{} F_k(1 \Vert{} x)$.

(c) $F'_k(x) \overset{\text{def}}{=} F_k(0 \Vert{} x) \Vert{} F_k(x \Vert{} 0)$.

(d) $F'_k(x) \overset{\text{def}}{=} F_k(0 \Vert{} x) \Vert{} F_k(x \Vert{} 1)$.

#### Solution

**(a) Not a PRF (No).**

- **Analysis:** The left half and the right half of the output are always identical.
    
- **Attack:**
    
    1. Query the oracle on an arbitrary input $x \in \{0, 1\}^{n-1}$ to obtain a $2n$-bit output $y$.
        
    2. Split $y$ into two $n$-bit blocks: $y = y_1 \Vert{} y_2$.
        
    3. If $y_1 = y_2$, output 1; otherwise, output 0.
        
- **Success Probability:** For $F'_k$, $\Pr[y_1 = y_2] = 1$. For a truly random function, $\Pr[y_1 = y_2] = 2^{-n}$. The distinguishing advantage is $1 - 2^{-n}$, which is non-negligible.
    

**(b) Is a PRF (Yes).**

- **Proof:** We prove this via reduction. Suppose there exists a polynomial-time distinguisher $D'$ that breaks the pseudorandomness of $F'$ with non-negligible advantage $\varepsilon(n)$. We can construct a polynomial-time distinguisher $D$ that breaks the pseudorandomness of $F$ with the same advantage.
    
    $D$ has access to an oracle $\mathcal{O}$ (which is either $F_k$ or a truly random function $f: \{0,1\}^n \rightarrow \{0,1\}^n$) and simulates the environment for $D'$ as follows:
    
    1. When $D'$ submits a query $x \in \{0, 1\}^{n-1}$, $D$ queries its own oracle $\mathcal{O}$ twice: once with $0\Vert{}x$ and once with $1\Vert{}x$.
        
    2. $D$ receives $y_1 = \mathcal{O}(0\Vert{}x)$ and $y_2 = \mathcal{O}(1\Vert{}x)$, and returns $y_1 \Vert{} y_2$ to $D'$.
        
    3. When $D'$ outputs a bit $b$, $D$ outputs the same bit $b$.
        
- **Case 1:** If $\mathcal{O} = F_k$, the view of $D'$ is identical to interacting with $F'_k$. Thus, $\Pr[D^{F_k(\cdot)}(1^n) = 1] = \Pr[D'^{F'_k(\cdot)}(1^n) = 1]$.
    
- **Case 2:** If $\mathcal{O} = f$ (a truly random function), since every query $x$ from $D'$ yields distinct strings $0\Vert{}x$ and $1\Vert{}x$ as inputs to $f$, all inputs queried to $f$ are unique. Because $f$ outputs independent, uniformly distributed strings for unique inputs, the concatenated outputs $f(0\Vert{}x) \Vert{} f(1\Vert{}x)$ are perfectly random and independent. Thus, the view of $D'$ is identical to interacting with a truly random function $f'$. Thus, $\Pr[D^{f(\cdot)}(1^n) = 1] = \Pr[D'^{f'(\cdot)}(1^n) = 1]$.
    

Therefore, $D$'s advantage in distinguishing $F$ from random is exactly equal to $D'$'s advantage $\varepsilon(n)$, contradicting the assumption that $F$ is a PRF.

**(c) Not a PRF (No).**

- **Analysis:** We can find two distinct inputs $x_1$ and $x_2$ such that the second block queried for $x_1$ overlaps with the first block queried for $x_2$. Let $x_1 = w \Vert{} 0$ and $x_2 = 0 \Vert{} w$ for some $w \in \{0,1\}^{n-2}$. Then the second half of $F'_k(x_1)$ is $F_k(w\Vert{}0\Vert{}0)$ and the first half of $F'_k(x_2)$ is $F_k(0\Vert{}0\Vert{}w)$, which does not directly match.
    
    Instead, notice that if we choose $x_1 = w \Vert{} 0$ and $x_2 = 0 \Vert{} w$, then:
    
    $$F'_k(x_1) = F_k(0 \Vert{} w \Vert{} 0) \Vert{} F_k(w \Vert{} 0 \Vert{} 0)$$
    
    $$F'_k(x_2) = F_k(0 \Vert{} 0 \Vert{} w) \Vert{} F_k(0 \Vert{} w \Vert{} 0)$$
    
    The **first** half of $F'_k(x_1)$ is identical to the **second** half of $F'_k(x_2)$.
    
- **Attack:**
    
    1. Pick an arbitrary string $w \in \{0, 1\}^{n-2}$ (assuming $n \ge 2$).
        
    2. Set $x_1 = w \Vert{} 0$ and $x_2 = 0 \Vert{} w$.
        
    3. Query $x_1$ to get $y = y_1 \Vert{} y_2$, and query $x_2$ to get $z = z_1 \Vert{} z_2$ (where $|y_i| = |z_i| = n$).
        
    4. If $y_1 = z_2$, output 1; otherwise, output 0.
        
- **Success Probability:** For $F'_k$, $y_1 = z_2 = F_k(0\Vert{}w\Vert{}0)$ is always true. For a random function, $\Pr[y_1 = z_2] = 2^{-n}$. This yields a non-negligible advantage.
    

**(d) Not a PRF (No).**

- **Analysis:** Similar to (c), we can cause an overlap between the first part of one input's evaluation and the second part of another. Let $x_1 = w \Vert{} 1$ and $x_2 = 0 \Vert{} w$ for some $w \in \{0,1\}^{n-2}$.
    
    $$F'_k(x_1) = F_k(0 \Vert{} w \Vert{} 1) \Vert{} F_k(w \Vert{} 1 \Vert{} 1)$$
    
    $$F'_k(x_2) = F_k(0 \Vert{} 0 \Vert{} w) \Vert{} F_k(0 \Vert{} w \Vert{} 1)$$
    
    The **first** half of $F'_k(x_1)$ is identical to the **second** half of $F'_k(x_2)$.
    
- **Attack:**
    
    1. Pick an arbitrary string $w \in \{0, 1\}^{n-2}$.
        
    2. Set $x_1 = w \Vert{} 1$ and $x_2 = 0 \Vert{} w$.
        
    3. Query $x_1$ to get $y_1 \Vert{} y_2$, and query $x_2$ to get $z_1 \Vert{} z_2$.
        
    4. If $y_1 = z_2$, output 1; otherwise, output 0.
        
- **Success Probability:** For $F'_k$, $y_1 = z_2 = F_k(0\Vert{}w\Vert{}1)$ always holds, while for a random function it holds with probability $2^{-n}$. This breaks the PRF property.
    

### 3.12

#### Question
Assuming the existence of pseudorandom functions, prove that there is an encryption scheme that has indistinguishable multiple encryptions in the presence of an eavesdropper (i.e., satisfies Definition 3.18), but is not CPA-secure (i.e., does not satisfy Definition 3.21).

**Hint:** The scheme need not be "natural." You will need to use the fact that in a chosen-plaintext attack the adversary can choose its queries to the encryption oracle _adaptively_.

#### Solution

**1. Base Construction**

Assume the existence of a pseudorandom function $F$, which implies the existence of a CPA-secure private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$. Consider a standard CPA-secure scheme where the ciphertext for a message $m \in \{0, 1\}^n$ under key $k \in \{0, 1\}^n$ is given by:

$$\mathsf{Enc}_k(m) = (r, F_k(r) \oplus m)$$

where $r \leftarrow \{0, 1\}^n$ is chosen uniformly at random. This scheme $\Pi$ is inherently secure against multiple encryptions in the presence of an eavesdropper.

**2. The Modified Scheme $\Pi' = (\mathsf{Gen}', \mathsf{Enc}', \mathsf{Dec}')$**

We construct a modified scheme $\Pi'$ that behaves exactly like $\Pi$, except it contains a "trapdoor" triggered only when an adversary makes specific, adaptive sequential queries that an eavesdropper cannot make.

Let $\mathsf{Gen}'$ be identical to $\mathsf{Gen}$. Define $\mathsf{Enc}'_k(m)$ to keep track of the _immediately preceding_ queried ciphertext components or states if accessed as an oracle, or more simply, we make the encryption stateful or dependent on specific sequence matching. Alternatively, to keep it stateless and clean, we can make the trapdoor trigger when the plaintext reveals a specific relationship to a previously generated ciphertext component.

Let's use a stateless construction based on the hint. Let the ciphertext of $m$ be $C = (r, c_1, c_2)$, where:

- Normally, $c_2 = 0^n$.
    
- The encryption algorithm $\mathsf{Enc}'_k(m)$ takes a message $m \in \{0,1\}^n$. It chooses $r \leftarrow \{0,1\}^n$.
    
- **Condition:** If $m = r'$ for some string $r'$, it does nothing special unless that $r'$ matches a specific structure. Let's design the trapdoor: if the message $m$ equals the key $k$, it leaks the key (but the adversary doesn't know $k$). Instead, let the oracle leak the secret key if the adversary passes the value $r$ that was _just output_ in a previous ciphertext.
    

Since a standard oracle is stateless, we can embed the trapdoor in the plaintext design:

Define $\mathsf{Enc}'_k(m)$:

1. Choose $r \leftarrow \{0, 1\}^n$.
    
2. If $m = 0^n$, then output $(r, F_k(r) \oplus m, 0^n)$.
    
3. If $m = r' \Vert{} 1$ for some $r'$, check if $F_k(r') \oplus F_k(r' \oplus 1) = 0^n$ (or any fixed relation). To make it simple: If $m$ starts with a special prefix, say $m = 1 \Vert{} m'$, then encrypt normally: $(r, F_k(r) \oplus m, 0^n)$.
    
4. Let's use the standard counter-example trick: The adversary can choose queries _adaptively_. Let the ciphertext be $C = (r, c)$. We define $\mathsf{Enc}'_k(m)$ as follows:
    
    - Choose $r \leftarrow \{0,1\}^n$.
        
    - If $m$ is of the form $m = r' \oplus 1^n$, then the output is $(r, F_k(r) \oplus m, k \oplus F_k(r'))$.
        
    - Otherwise, the output is $(r, F_k(r) \oplus m, 0^n)$.
        

Let's verify why this works:

- **Eavesdropper Security (Multiple Encryptions):** An eavesdropper only observes ciphertexts of messages $m_1, \dots, m_t$ chosen _before_ seeing any ciphertexts. The probability that any chosen message $m_i$ satisfies $m_i = r' \oplus 1^n$ for a random string $r'$ that will be chosen _during_ that specific encryption is at most $1/2^n$. Since $r'$ is chosen uniformly at random _after_ the message is fixed (or independently), the probability that the third component is not $0^n$ is negligible. Thus, to an eavesdropper, $\Pi'$ is statistically indistinguishable from $\Pi$, which means it satisfies multiple-encryption security in the presence of an eavesdropper.
    
- **CPA Attack (Not CPA-secure):** A CPA adversary can query the encryption oracle adaptively:
    
    1. The adversary queries the oracle with an arbitrary message, say $m_1 = 0^n$.
        
    2. The oracle returns a ciphertext $C_1 = (r_1, c_1, 0^n)$.
        
    3. The adversary now knows $r_1$. It adaptively constructs the next message: $m_2 = r_1 \oplus 1^n$.
        
    4. The adversary queries $m_2$ to the oracle.
        
    5. The oracle chooses a new random $r_2$ and outputs $C_2 = (r_2, F_k(r_2) \oplus m_2, k \oplus F_k(r_1))$.
        
    6. Since the adversary knows $r_1$ and $c_1 = F_k(r_1) \oplus 0^n = F_k(r_1)$, it can easily compute $F_k(r_1) = c_1$.
        
    7. The adversary extracts the secret key $k$ from the third component of $C_2$: $k = (k \oplus F_k(r_1)) \oplus c_1$.
        

Once the adversary knows the secret key $k$, it can break the CPA challenge with probability 1. Thus, $\Pi'$ is not CPA-secure.

### 3.13

#### Question
Let $F$ be a keyed function and consider the following experiment:

**The PRF indistinguishability experiment $\mathsf{PRF}_{\mathcal{A},F}(n)$:**

(a) A uniform $b \in \{0, 1\}$ is chosen. If $b = 0$, choose uniform $f \in \mathsf{Func}_n$; if $b = 1$, choose uniform $k \in \{0, 1\}^n$.

(b) $\mathcal{A}$ is given $1^n$ as input. If $b = 0$ then $\mathcal{A}$ is given access to $f(\cdot)$. If $b = 1$ then $\mathcal{A}$ is given access to $F_k(\cdot)$.

(c) $\mathcal{A}$ outputs a bit $b'$.

(d) The output of the experiment is defined to be $1$ if $b' = b$, and $0$ otherwise.

Define pseudorandom functions using this experiment, and prove that your definition is equivalent to Definition 3.24.

#### Solution

**1. Definition Using the Experiment.**

An efficient, length-preserving, keyed function $F : \{0, 1\}^* \times \{0, 1\}^* \rightarrow \{0, 1\}^*$ is a **pseudorandom function** under the new experiment if for all probabilistic polynomial-time (PPT) adversaries $\mathcal{A}$, there exists a negligible function $\mathsf{negl}$ such that:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] \le \frac{1}{2} + \mathsf{negl}(n)$$

**2. Equivalence Proof.**

We show that an adversary breaks Definition 3.24 if and only if it breaks the new definition. Let $D$ be a distinguisher in the sense of Definition 3.24, and let $\mathcal{A}$ be an adversary in the new experiment.

First, let's expand the success probability in the new experiment using the law of total probability:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] = \Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1 \mid b=1]\Pr[b=1] + \Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1 \mid b=0]\Pr[b=0]$$

Since $\Pr[b=1] = \Pr[b=0] = \frac{1}{2}$, and the experiment outputs 1 when $b'=b$:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] = \frac{1}{2}\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] + \frac{1}{2}\Pr[\mathcal{A}^{f(\cdot)}(1^n) = 0]$$

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] = \frac{1}{2}\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] + \frac{1}{2}\left(1 - \Pr[\mathcal{A}^{f(\cdot)}(1^n) = 1]\right)$$

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] = \frac{1}{2} + \frac{1}{2}\left(\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] - \Pr[\mathcal{A}^{f(\cdot)}(1^n) = 1]\right)$$

Subtracting $\frac{1}{2}$ from both sides yields:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] - \frac{1}{2} = \frac{1}{2}\left(\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] - \Pr[\mathcal{A}^{f(\cdot)}(1^n) = 1]\right)$$

##### Direction 1: Definition 3.24 $\implies$ New Definition

Suppose $F$ satisfies Definition 3.24. Then for any PPT adversary $\mathcal{A}$ (acting as $D$), we have:

$$\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] - \Pr[\mathcal{A}^{f(\cdot)}(1^n) = 1] \le \left|\Pr[\mathcal{A}^{F_k(\cdot)}(1^n) = 1] - \Pr[\mathcal{A}^{f(\cdot)}(1^n) = 1]\right| \le \mathsf{negl}(n)$$

Substituting this into our equation:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] - \frac{1}{2} \le \frac{1}{2}\cdot\mathsf{negl}(n) = \mathsf{negl}'(n)$$

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] \le \frac{1}{2} + \mathsf{negl}'(n)$$

Thus, $F$ satisfies the new definition.

##### Direction 2: New Definition $\implies$ Definition 3.24

Suppose $F$ satisfies the new definition. Let $D$ be any PPT distinguisher for Definition 3.24. We can construct an adversary $\mathcal{A}$ for the new experiment that runs $D$.

However, $D$'s advantage is an absolute value $\left|\Pr[D^{F_k(\cdot)}(1^n)=1] - \Pr[D^{f(\cdot)}(1^n)=1]\right|$.

- If $\Pr[D^{F_k(\cdot)}(1^n)=1] \ge \Pr[D^{f(\cdot)}(1^n)=1]$, $\mathcal{A}$ simply runs $D$ and outputs what $D$ outputs ($b'=D(\cdot)$).
    
- If $\Pr[D^{F_k(\cdot)}(1^n)=1] < \Pr[D^{f(\cdot)}(1^n)=1]$, $\mathcal{A}$ runs $D$ and flips its output ($b'=1-D(\cdot)$).
    

In either case, $\mathcal{A}$ can be designed so that:

$$\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] - \frac{1}{2} = \frac{1}{2}\left|\Pr[D^{F_k(\cdot)}(1^n) = 1] - \Pr[D^{f(\cdot)}(1^n) = 1]\right|$$

Since $F$ satisfies the new definition, $\Pr[\mathsf{PRF}_{\mathcal{A},F}(n) = 1] - \frac{1}{2} \le \mathsf{negl}(n)$. Therefore:

$$\frac{1}{2}\left|\Pr[D^{F_k(\cdot)}(1^n) = 1] - \Pr[D^{f(\cdot)}(1^n) = 1]\right| \le \mathsf{negl}(n)$$

$$\left|\Pr[D^{F_k(\cdot)}(1^n) = 1] - \Pr[D^{f(\cdot)}(1^n) = 1]\right| \le 2\cdot\mathsf{negl}(n) = \mathsf{negl}''(n)$$

Thus, $F$ satisfies Definition 3.24.

### 3.14
#### Question
Define the keyed function $F$ as $F_k(x) \overset{\text{def}}{=} k \, \& \, x$, where "$\&$" denotes bitwise AND. Describe and analyze an attack showing that $F$ is not a pseudorandom function.

#### Solution

A distinguisher $D$ has oracle access to a function $\mathcal{O}$, which is either $F_k$ (where $k \leftarrow \{0,1\}^n$) or a truly random function $f : \{0,1\}^n \rightarrow \{0,1\}^n$.

**1. The Attack Strategy.**

A bitwise AND operation possesses a deterministic property: for any key $k$ and any input $x$, the output bits of $k \, \& \, x$ can never be $1$ at positions where the input $x$ has a $0$ bit.

We can exploit this by querying the oracle with the all-zero string $x = 0^n$.

- If $\mathcal{O} = F_k$, then $\mathcal{O}(0^n) = k \, \& \, 0^n = 0^n$.
    
- If $\mathcal{O} = f$, the output $f(0^n)$ is a uniformly random $n$-bit string, which equals $0^n$ with a very low probability ($2^{-n}$).
    

**2. Distinguisher Algorithm.**

1. Query the oracle $\mathcal{O}$ with the input $x = 0^n$.
    
2. Receive the output $y = \mathcal{O}(0^n)$.
    
3. If $y = 0^n$, output 1 (predicting it is $F_k$); otherwise, output 0 (predicting it is a random function).
    

**3. Success Probability Analysis.**

- **Case 1: $\mathcal{O}$ is the pseudorandom function $F_k$**
    
    $$\Pr[D^{F_k(\cdot)}(1^n) = 1] = \Pr[k \, \& \, 0^n = 0^n] = 1$$
    
- **Case 2: $\mathcal{O}$ is a truly random function $f$**
    
    $$\Pr[D^{f(\cdot)}(1^n) = 1] = \Pr[f(0^n) = 0^n] = \frac{1}{2^n}$$
    
- **Distinguishing Advantage:**
    
    $$\text{Advantage} = \left| \Pr[D^{F_k(\cdot)}(1^n) = 1] - \Pr[D^{f(\cdot)}(1^n) = 1] \right| = 1 - \frac{1}{2^n}$$
    

For any $n \ge 1$, this advantage is non-negligible (in fact, it approaches $1$ exponentially fast as $n$ grows). Thus, $F$ is not a pseudorandom function.

### 3.15

#### Question
Consider the following keyed function $F$: For security parameter $n$, the key is an $n \times n$ boolean matrix $A$ and an $n$-bit boolean vector $b$. Define $F_{A,b} : \{0, 1\}^n \rightarrow \{0, 1\}^n$ by $F_{A,b}(x) \overset{\text{def}}{=} Ax + b$, where all operations are done modulo 2. Show that $F$ is not a pseudorandom function.

#### Solution

**1. The Attack Strategy.**

The function $F_{A,b}(x) = Ax + b \pmod 2$ is an affine transformation, which means it satisfies a strict linear relationship. Specifically, for any three inputs $x_1, x_2, x_3 \in \{0, 1\}^n$, we can define a fourth input $x_4 = x_1 \oplus x_2 \oplus x_3$.

If $\mathcal{O}$ is $F_{A,b}$, then by linear expansion modulo 2:

$$\mathcal{O}(x_1) \oplus \mathcal{O}(x_2) \oplus \mathcal{O}(x_3) = (Ax_1 + b) + (Ax_2 + b) + (Ax_3 + b) = A(x_1 + x_2 + x_3) + b = Ax_4 + b = \mathcal{O}(x_4)$$

Thus, the outputs satisfy $\mathcal{O}(x_1) \oplus \mathcal{O}(x_2) \oplus \mathcal{O}(x_3) \oplus \mathcal{O}(x_4) = 0^n$. A truly random function $f$ will yield independent random outputs for distinct inputs, meaning this linear combination will equal $0^n$ with an extremely low probability.

**2. Distinguisher Algorithm.**

1. Choose three distinct, non-zero vectors $x_1, x_2, x_3 \in \{0, 1\}^n$ such that $x_4 = x_1 \oplus x_2 \oplus x_3$ is also distinct from $x_1, x_2, x_3$ (e.g., $x_1 = 100\dots0$, $x_2 = 010\dots0$, $x_3 = 001\dots0$ for $n \ge 3$).
    
2. Query the oracle $\mathcal{O}$ on inputs $x_1, x_2, x_3,$ and $x_4$ to obtain $y_1, y_2, y_3,$ and $y_4$.
    
3. If $y_1 \oplus y_2 \oplus y_3 \oplus y_4 = 0^n$, output 1; otherwise, output 0.
    

**3. Success Probability Analysis.**

- **Case 1: $\mathcal{O}$ is the keyed function $F_{A,b}$**
    
    $$\Pr[D^{F_{A,b}(\cdot)}(1^n) = 1] = 1$$
    
- **Case 2: $\mathcal{O}$ is a truly random function $f$**
    
    Since $x_1, x_2, x_3, x_4$ are distinct inputs, the outputs $y_1, y_2, y_3, y_4$ are independent and uniformly distributed $n$-bit strings. The probability that their XOR sum is exactly $0^n$ is:
    
    $$\Pr[D^{f(\cdot)}(1^n) = 1] = \frac{1}{2^n}$$
    
- **Distinguishing Advantage:**
    
    $$\text{Advantage} = \left| 1 - \frac{1}{2^n} \right| = 1 - \frac{1}{2^n}$$
    

Since this advantage is non-negligible, $F$ is not a pseudorandom function.

### 3.16

#### Question

**3.16** Prove that if $F$ is a length preserving pseudorandom function, then $G(s) \overset{\text{def}}{=} F_s(\langle1\rangle) \Vert{} F_s(\langle2\rangle) \Vert{} \dots \Vert{} F_s(\langle\ell\rangle)$, where $\langle i\rangle$ is the $n$-bit encoding of $i$, is a pseudorandom generator with expansion factor $\ell \cdot n$.

#### Solution

We prove this via a reduction (proof by contradiction). Suppose there exists a polynomial-time distinguisher $D'$ that can break the pseudorandomness of the generator $G$ with a non-negligible advantage $\varepsilon(n)$. We will construct a polynomial-time distinguisher $D$ that breaks the pseudorandomness of the function $F$ with the same advantage.

**1. Constructing the Distinguisher $D$**

The distinguisher $D$ is given oracle access to a function $\mathcal{O}$, which is either $F_s(\cdot)$ (for a uniform seed/key $s \in \{0, 1\}^n$) or a truly random function $f : \{0, 1\}^n \rightarrow \{0, 1\}^n$. $D$ simulates the environment for $D'$ as follows:

1. $D$ queries its oracle $\mathcal{O}$ on the sequence of fixed inputs $\langle1\rangle, \langle2\rangle, \dots, \langle\ell\rangle$.
    
2. $D$ receives the $n$-bit outputs $y_1 = \mathcal{O}(\langle1\rangle), y_2 = \mathcal{O}(\langle2\rangle), \dots, y_\ell = \mathcal{O}(\langle\ell\rangle)$.
    
3. $D$ concatenates these strings to form a single $\ell \cdot n$-bit string: $w = y_1 \Vert{} y_2 \Vert{} \dots \Vert{} y_\ell$.
    
4. $D$ runs $D'$ on input $w$.
    
5. When $D'$ outputs a bit $b'$, $D$ outputs the same bit $b'$.
    

**2. Success Probability Analysis**

- **Case 1: $\mathcal{O}$ is the pseudorandom function $F_s(\cdot)$**
    
    When $\mathcal{O} = F_s$, the constructed string is $w = F_s(\langle1\rangle) \Vert{} \dots \Vert{} F_s(\langle\ell\rangle)$, which matches the exact definition of $G(s)$. Thus, $D'$ views a valid output from the pseudorandom generator:
    
    $$\Pr[D^{F_s(\cdot)}(1^n) = 1] = \Pr[D'(G(s)) = 1]$$
    
- **Case 2: $\mathcal{O}$ is a truly random function $f(\cdot)$**
    
    When $\mathcal{O} = f$, the outputs $y_1 = f(\langle1\rangle), \dots, y_\ell = f(\langle\ell\rangle)$ are the evaluations of a truly random function on $\ell$ distinct, fixed inputs. Because $f$ is a uniform random function and the inputs are distinct, each $y_i$ is an independent, uniformly distributed $n$-bit string. Consequently, the concatenated string $w = y_1 \Vert{} \dots \Vert{} y_\ell$ is a perfectly uniform random string of length $\ell \cdot n$. Let $r \leftarrow \{0,1\}^{\ell \cdot n}$, then:
    
    $$\Pr[D^{f(\cdot)}(1^n) = 1] = \Pr[D'(r) = 1]$$
    

**3. Conclusion**

Subtracting the two probabilities yields the distinguishing advantage:

$$\left| \Pr[D^{F_s(\cdot)}(1^n) = 1] - \Pr[D^{f(\cdot)}(1^n) = 1] \right| = \left| \Pr[D'(G(s)) = 1] - \Pr[D'(r) = 1] \right| = \varepsilon(n)$$

Since $F$ is a pseudorandom function, the advantage of any polynomial-time distinguisher $D$ must be negligible. Therefore, $\varepsilon(n)$ must also be negligible. This proves that $G(s)$ is a secure pseudorandom generator.

### 3.17
#### Question

**3.17** Assume pseudorandom permutations exist. Show that there exists a keyed function $F$ that is a pseudorandom permutation but is _not_ a strong pseudorandom permutation.

**Hint:** Construct $F$ such that $F_k(k) = 0^{|k|}$.

#### Solution

**1. Definition of the Counterexample**

Let $G_k : \{0, 1\}^n \rightarrow \{0, 1\}^n$ be a secure length-preserving pseudorandom permutation (PRP). Following the hint, we construct a modified permutation $F_k : \{0, 1\}^n \rightarrow \{0, 1\}^n$ that forces a specific input-output point.

To ensure $F_k(k) = 0^n$ while remaining a valid bijection (permutation), we must swap the outputs. Let $y_0 = G_k(k)$ and $x_0 = G_k^{-1}(0^n)$. We define $F_k(x)$ as follows:

- If $x = k$, then $F_k(x) = 0^n$.
    
- If $x = x_0$, then $F_k(x) = y_0$.
    
- For all other $x$ (where $x \neq k$ and $x \neq x_0$), $F_k(x) = G_k(x)$.
    

Since $F_k$ simply swaps two outputs of the permutation $G_k$, $F_k$ remains a well-defined permutation.

**2. $F$ is a Pseudorandom Permutation (PRP)**

A standard PRP distinguisher $D$ only has forward oracle access to $F_k(\cdot)$.

For any polynomial-time adversary $D$ making $q(n)$ forward queries, the adversary can only trigger the modified behavior if it queries either $x = k$ or $x = x_0$.

- The key $k$ is chosen uniformly at random from $\{0, 1\}^n$ and is hidden from $D$. The probability that $D$ guesses the key $k$ in $q(n)$ queries is at most $q(n)/2^n$.
    
- The value $x_0 = G_k^{-1}(0^n)$ is also uniformly random and unknown from the forward perspective, because $G_k$ is a secure PRP. The probability that $D$ queries $x_0$ in $q(n)$ queries is negligibly close to $q(n)/2^n$.
    

Since the probability of hitting these two points is negligible, the forward behavior of $F_k$ is statistically close to $G_k$. Because $G_k$ is a secure PRP, $F_k$ is also a secure PRP.

**3. $F$ is NOT a Strong Pseudorandom Permutation (SPRP)**

A strong PRP distinguisher $D'$ has oracle access to both the forward direction $F_k(\cdot)$ and the inverse direction $F_k^{-1}(\cdot)$. We can break the security of $F_k$ using a single inversion query:

1. Query the inverse oracle $\mathcal{O}^{-1}$ on the point $y = 0^n$.
    
2. Receive the output $x = \mathcal{O}^{-1}(0^n)$.
    
3. Query the forward oracle $\mathcal{O}$ on the point $x$ to get $y' = \mathcal{O}(x)$. (This step confirms consistency).
    
4. If $\mathcal{O}(x) = 0^n$, the adversary checks if $x$ is the secret key. The adversary tests if $x$ is the key by querying another point, or simply outputs 1 if $x$ satisfies the rule. Specifically, under $F_k$, the answer to $\mathcal{O}^{-1}(0^n)$ is always the key $k$. The adversary can verify if $x$ is the key by checking if $\mathcal{O}(x) = 0^n$, which is trivially true.
    
5. To definitively distinguish it from a random permutation, the adversary computes $y_0 = \mathcal{O}(x)$ and checks a fixed relation, or simply outputs 1 if it gets a valid response. A better test: Since $x = k$, the adversary now holds the key $k$! It can query a new point $x' \neq x$, compute $G_x(x')$, and check if $\mathcal{O}(x') = G_x(x')$.
    

- **Case 1: $\mathcal{O} = F_k$**
    
    The inverse query $\mathcal{O}^{-1}(0^n)$ returns $k$. The adversary now knows the key $k$. Testing a new point $x'$ yields $F_k(x') = G_k(x')$ with overwhelming probability. The adversary computes $G_k(x')$ itself and finds a match, outputting 1 with probability $\approx 1$.
    
- **Case 2: $\mathcal{O} = f$ (a truly random permutation)**
    
    The inverse query $f^{-1}(0^n)$ returns a random value $r$. The probability that $r$ happens to satisfy the same key verification equation for an independent random permutation is negligible ($2^{-n}$).
    

The distinguishing advantage is close to 1, meaning $F$ is not a strong PRP.
