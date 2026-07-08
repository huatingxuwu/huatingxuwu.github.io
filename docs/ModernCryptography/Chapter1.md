## 1.1 Cryptography and Modern Cryptography
## 1.2 The Setting of Private-Key Encryption
a procedure for generating keys (`Gen`), a procedure for encrypting (`Enc`), and a procedure for decrypting (`Dec`)

for every key $k$ output by `Gen` and every message $m \in \mathcal{M}$, it holds that

$$
\mathrm{Dec}_k(\mathrm{Enc}_k(m)) = m.
$$

## 1.3 Historical Ciphers
Caesar's cipher
Shift cipher:
the English alphabet with the set $\{0,\ldots,25\}$ (so $a = 0$, $b = 1$, etc.). The message space $\mathcal{M}$ is then any finite sequence of integers from this set. Encryption of the message $m = m_1 \cdots m_\ell$ (where $m_i \in \{0,\ldots,25\}$) using key $k$ is given by

$$
\mathrm{Enc}_k(m_1 \cdots m_\ell) = c_1 \cdots c_\ell,
\qquad
c_i = (m_i + k) \bmod 26.
$$

Decryption of a ciphertext $c = c_1 \cdots c_\ell$ using key $k$ is given by

$$
\mathrm{Dec}_k(c_1 \cdots c_\ell) = m_1 \cdots m_\ell,
\qquad
m_i = (c_i - k) \bmod 26.
$$

The mono-alphabetic substitution cipher:
![[english_frequency.png|410]]associate the letters of the English alphabet with $0,\ldots,25$. Let $p_i$, with $0 \le p_i \le 1$, denote the frequency of the $i$th letter in normal English text (i.e., $p_0 = 0.082$ using Figure 1.3). Calculation using Figure 1.3 gives

$$
\sum_{i=0}^{25} p_i^2 \approx 0.065.
$$

Now. say we are given some ciphertext and let $q_i$ denote the frequency of the $i$th letter of the alphabet in this ciphertext; i.e., $q_i$ is simply the number of occurrences of the $i$th letter of the alphabet in the ciphertext divided by the length of the ciphertext. If the key is $k$, then $p_i$ should be roughly equal to $q_{i+k}$ for all $i$ because the $i$th letter is mapped to the $(i + k)$th letter. (We use $i + k$ instead of the more cumbersome $[i + k \bmod 26]$.) Thus, if we compute

$$
I_j \stackrel{\mathrm{def}}{=} \sum_{i=0}^{25} p_i q_{i+j}
$$

for each value of $j \in \{0,\ldots,25\}$, then we expect to find that $I_k \approx 0.065$ (where $k$ is the actual key), whereas $I_j$ for $j \ne k$ will be different from $0.065$. This leads to a key-recovery attack that is easy to automate: compute $I_j$ for all $j$, and then output the value $k$ for which $I_k$ is closest to $0.065$.

The Vigenère (poly-alphabetic shift) cipher:
let $q_i$ denote the observed frequency of the $i$th letter in this stream; this is simply the number of occurrences of the $i$th letter of the alphabet divided by the total number of letters in the stream. If the shift used here is $j$ (i.e., if the first character $k_1$ of the key is equal to $j$), then for all $i$ we expect $q_{i+j} \approx p_i$, where $p_i$ is the frequency of the $i$th letter of the alphabet in standard English text. (Once again, we use $q_{i+j}$ in place of $q_{[i+j \bmod 26]}$.) But this means that the sequence $q_0,\ldots,q_{25}$ is just the sequence $p_0,\ldots,p_{25}$ shifted $j$ places. As a consequence (cf. Equation (1.1)):

$$
\sum_{i=0}^{25} q_i^2 \approx \sum_{i=0}^{25} p_i^2 \approx 0.065.
$$

This leads to a nice way to determine the key length $t$. For $\tau = 1,2,\ldots,T$, look at the sequence of ciphertext characters $c_1,c_{1+\tau},c_{1+2\tau},\ldots$ and tabulate $q_0,\ldots,q_{25}$ for this sequence. Then compute

$$
S_\tau \stackrel{\mathrm{def}}{=} \sum_{i=0}^{25} q_i^2.
$$

When $\tau = t$ we expect $S_\tau \approx 0.065$, as discussed above. On the other hand, if $\tau$ is not a multiple of $t$ we expect that all characters will occur with roughly equal probability in the sequence $c_1,c_{1+\tau},c_{1+2\tau},\ldots$, and so we expect $q_i \approx 1/26$ for all $i$. In this case we will obtain

$$
S_\tau \approx \sum_{i=0}^{25} \left(\frac{1}{26}\right)^2 \approx 0.038.
$$

The smallest value of $\tau$ for which $S_\tau \approx 0.065$ is thus likely the key length. One can further validate a guess $\tau$ by carrying out a similar calculation using the second stream $c_2,c_{2+\tau},c_{2+2\tau},\ldots$, etc.

## 1.4 Principles of Modern Cryptography
### 1.4.1 Principle 1 — Formal Definitions
_regardless of any information an attacker already has, a ciphertext should leak no_ additional _information about the underlying plaintext

### 1.4.2 Principle 2 – Precise Assumptions
_Validation of assumptions:_
_Comparison of assumptions_
_Understanding the necessary assumptions_
### 1.4.3 Principle 3 – Proofs of Security
Proofs of security give an iron-clad guarantee—relative to the definition and assumptions—that no attacker will succeed; this is much better than taking an unprincipled or heuristic approach to the problem.

### 1.4.4 Provable Security and Real-World Security

To attack a provably secure scheme in the real world, the attacker is forced to focus attention on the definition (i.e., to explore how the idealized definition differs from the real-world requirements) or the underlying assumptions (i.e., to see whether they hold). In turn, it is the job of cryptographers to continually refine their definitions to more closely match the real world, and to investigate their assumptions to test their validity
