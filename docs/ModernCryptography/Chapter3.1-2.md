## 3.1 Computational Security

*Security is only guaranteed against **efficient** adversaries that run for some feasible amount of time.*
*Adversaries can potentially succeed (i.e., security can potentially fail) with some **very small probability**.*

### 3.1.1 The Concrete Approach

The concrete approach quantifies security by explicitly bounding the maximum success probability of a (randomized) adversary running for some specified amount of time or, more precisely, investing some specified amount of computational effort.

A scheme is $(t, \varepsilon)$-*secure* if any adversary running for time at most $t$ succeeds in breaking the scheme with probability at most $\varepsilon$.

### 3.1.2 The Asymptotic Approach

This approach introduces an integer-valued *security parameter* (denoted by $n$) that parameterizes both cryptographic schemes as well as all involved parties.

Let PPT stand for "probabilistic polynomial-time." A definition of asymptotic security then takes the following general form:

> A scheme is secure if any PPT adversary succeeds in breaking the scheme with at most negligible probability.

A function $f$ from the natural numbers to the non-negative real numbers is *polynomially bounded* (or simply *polynomial*) if there is a constant $c$ such that $f(n) < n^c$ for all $n$. An algorithm $A$ runs in polynomial time if there exists a polynomial $p$ such that, for every input $x \in \{0, 1\}^*$, the computation of $A(x)$ terminates within at most $p(|x|)$ steps. (Here, $|x|$ denotes the length of the string $x$.)

We equate efficient adversaries with those whose running time is polynomial in the security parameter $n$.

By default, we allow all algorithms to be probabilistic (i.e., randomized). Any such algorithm is assumed to have access to a sequence of unbiased, independent random bits.

**DEFINITION 3.4.** A function $f$ from the natural numbers to the non-negative real numbers is *negligible* if for every polynomial $p$ there is an $N$ such that for all $n > N$ it holds that

$$f(n) < \frac{1}{p(n)}.$$

**PROPOSITION 3.6.** Let $\mathsf{negl}_1$ and $\mathsf{negl}_2$ be negligible functions. Then,

1. The function $\mathsf{negl}_3(n) = \mathsf{negl}_1(n) + \mathsf{negl}_2(n)$ is negligible.

2. For any polynomial $p$, the function $\mathsf{negl}_4(n) = p(n) \cdot \mathsf{negl}_1(n)$ is negligible.

A corollary of the second part of the above proposition is that if a function $g$ is *not* negligible, then neither is the function $f(n) \stackrel{\text{def}}{=} g(n)/p(n)$ for any polynomial $p$.

**Summary.** A scheme is *secure* if for every PPT adversary $\mathcal{A}$ carrying out an attack, and every polynomial $p$, there is an integer $N$ such that when $n > N$ the probability that $\mathcal{A}$ succeeds in the attack is less than $\frac{1}{p(n)}$.

## 3.2 Defining Computationally Secure Encryption

**DEFINITION 3.7.** A *private-key encryption scheme* consists of three probabilistic polynomial-time algorithms $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ such that:

1. The key-generation algorithm $\mathsf{Gen}$ takes as input $1^n$ (i.e., the security parameter written in unary) and outputs a key $k$; we write $k \leftarrow \mathsf{Gen}(1^n)$ (emphasizing that $\mathsf{Gen}$ is a randomized algorithm). We assume without loss of generality that any key $k$ output by $\mathsf{Gen}(1^n)$ satisfies $|k| \geq n$.

2. The encryption algorithm $\mathsf{Enc}$ takes as input a key $k$ and a plaintext message $m \in \{0, 1\}^*$, and outputs a ciphertext $c$. Since $\mathsf{Enc}$ may be randomized, we write this as $c \leftarrow \mathsf{Enc}_k(m)$.

3. The decryption algorithm $\mathsf{Dec}$ takes as input a key $k$ and a ciphertext $c$, and outputs a message $m \in \{0, 1\}^*$ or an error. We denote a generic error by the symbol $\bot$.

It is required that for every $n$, every key $k$ output by $\mathsf{Gen}(1^n)$, and every $m \in \{0, 1\}^*$, it holds that $\mathsf{Dec}_k(\mathsf{Enc}_k(m)) = m$.

If $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ is such that for $k$ output by $\mathsf{Gen}(1^n)$, algorithm $\mathsf{Enc}_k$ is only defined for messages $m \in \{0, 1\}^{\ell(n)}$, then we say that $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ is a *fixed-length private-key encryption scheme* for messages of length $\ell(n)$.

### 3.2.1 The Basic Definition of Security (EAV-Security)

Here, we keep the experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}$ almost exactly the same (except for some technical differences discussed below), but introduce two important modifications in the definition itself:

1. We now consider only adversaries running in *polynomial time*, whereas Definition 2.6 considered even adversaries with unbounded running time.

2. We now concede that the adversary might determine the encrypted message with probability *negligibly better than* $1/2$.

3. The running time of the adversary $\mathcal{A}$, as well as its success probability, are both viewed as functions of $n$. We write $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n)$ to denote the experiment being run with security parameter $n$, and write

$$\Pr\left[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n) = 1\right]$$

to denote the probability that the output of experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n)$ is 1.

A second difference is that we now explicitly require the adversary to output two messages $m_0, m_1$ *of equal length*. This means that, by default, we do not require a secure encryption scheme to hide the length of the plaintext.

**The adversarial indistinguishability experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n)$:**

1. The adversary $\mathcal{A}$ is given input $1^n$, and outputs a pair of messages $m_0, m_1$ with $|m_0| = |m_1|$.

2. A key $k$ is generated by running $\mathsf{Gen}(1^n)$, and a uniform bit $b \in \{0, 1\}$ is chosen. Ciphertext $c \leftarrow \mathsf{Enc}_k(m_b)$ is computed and given to $\mathcal{A}$. We refer to $c$ as the *challenge ciphertext*.

3. $\mathcal{A}$ outputs a bit $b'$.

4. The output of the experiment is defined to be 1 if $b' = b$, and 0 otherwise. If $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n) = 1$, we say that $\mathcal{A}$ succeeds.

**DEFINITION 3.8.** A private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ has indistinguishable encryptions in the presence of an eavesdropper, or is EAV-secure, if for all probabilistic polynomial-time adversaries $\mathcal{A}$ there is a negligible function $\mathsf{negl}$ such that, for all $n$,

$$\Pr\left[\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n) = 1\right] \le \frac{1}{2} + \mathsf{negl}(n).$$

The probability above is taken over the randomness used by $\mathcal{A}$ and the randomness used in the experiment (for choosing the key and the bit $b$, as well as any randomness used by $\mathsf{Enc}$).

Define $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, b)$ as above except that the fixed bit $b \in \{0, 1\}$ is used (rather than being chosen at random). Let $\mathsf{out}_{\mathcal{A}}\bigl(\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, b)\bigr)$ denote the output bit $b'$ of $\mathcal{A}$ in this experiment. The following states that the output distribution of $\mathcal{A}$ is not significantly affected by whether it is running in experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, 0)$ or experiment $\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, 1)$.

**DEFINITION 3.9.** A private-key encryption scheme $\Pi = (\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ has indistinguishable encryptions in the presence of an eavesdropper if for all PPT adversaries $\mathcal{A}$ there is a negligible function $\mathsf{negl}$ such that

$$\left|\Pr\left[\mathsf{out}_{\mathcal{A}}\bigl(\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, 0)\bigr) = 1\right] - \Pr\left[\mathsf{out}_{\mathcal{A}}\bigl(\mathsf{PrivK}^{\mathsf{eav}}_{\mathcal{A}, \Pi}(n, 1)\bigr) = 1\right]\right| \le \mathsf{negl}(n).$$

### 3.2.2 Semantic Security

**THEOREM 3.10.** Let $\Pi = (\mathsf{Enc}, \mathsf{Dec})$ be a fixed-length private-key encryption scheme for messages of length $\ell$ that is EAV-secure. Then for all PPT adversaries $\mathcal{A}$ and $i \in \{1, \dots, \ell\}$, there is a negligible function $\mathsf{negl}$ such that

$$\Pr\left[\mathcal{A}(1^n, \mathsf{Enc}_k(m)) = m^i\right] \le \frac{1}{2} + \mathsf{negl}(n), \tag{3.2}$$

where the probability is taken over uniform $m \in \{0, 1\}^\ell$ and $k \in \{0, 1\}^n$, the randomness of $\mathcal{A}$, and the randomness of $\mathsf{Enc}$.

**THEOREM 3.11.** Let $(\mathsf{Enc}, \mathsf{Dec})$ be a fixed-length private-key encryption scheme for messages of length $\ell$ that is EAV-secure. Then for any PPT algorithm $\mathcal{A}$ there is a PPT algorithm $\mathcal{A}'$ such that for any distribution $\mathcal{D}$ over $\{0, 1\}^\ell$ and any function $f : \{0, 1\}^\ell \rightarrow \{0, 1\}$, there is a negligible function $\mathsf{negl}$ such that:

$$\bigl|\Pr[\mathcal{A}(1^n, \mathsf{Enc}_k(m)) = f(m)] - \Pr[\mathcal{A}'(1^n) = f(m)]\bigr| \le \mathsf{negl}(n),$$

where the first probability is taken over choice of $m$ according to $\mathcal{D}$, uniform choice of $k \in \{0, 1\}^n$, and the randomness of $\mathcal{A}$ and $\mathsf{Enc}$, and the second probability is taken over choice of $m$ according to $\mathcal{D}$ and the randomness of $\mathcal{A}'$.

**Semantic security:**

**DEFINITION 3.12.** A private-key encryption scheme $(\mathsf{Enc}, \mathsf{Dec})$ is *semantically secure* in the presence of an eavesdropper if for every PPT algorithm $\mathcal{A}$ there exists a PPT algorithm $\mathcal{A}'$ such that for any PPT algorithm $\mathsf{Samp}$ and polynomial-time computable functions $f$ and $h$, the following is negligible:

$$\bigl|\Pr[\mathcal{A}(1^n, \mathsf{Enc}_k(m), h(m)) = f(m)] - \Pr[\mathcal{A}'(1^n, |m|, h(m)) = f(m)]\bigr|,$$

where the first probability is taken over $m$ output by $\mathsf{Samp}(1^n)$, uniform choice of $k \in \{0, 1\}^n$, and the randomness of $\mathsf{Enc}$ and $\mathcal{A}$, and the second probability is taken over $m$ output by $\mathsf{Samp}(1^n)$ and the randomness of $\mathcal{A}'$.

**THEOREM 3.13.** A private-key encryption scheme has indistinguishable encryptions in the presence of an eavesdropper (i.e., is EAV-secure) if and only if it is semantically secure in the presence of an eavesdropper.
