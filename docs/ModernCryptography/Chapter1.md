## 1.1 Cryptography and Modern Cryptography
## 1.2 The Setting of Private-Key Encryption
a procedure for generating keys (`Gen`), a procedure for encrypting (`Enc`), and a procedure for decrypting (`Dec`)

for every key k output by `Gen` and every message _m_ ∈ ℳ, it holds that
$$Dec_k(Enc_k(m))=m $$
## 1.3 Historical Ciphers
Caesar's cipher
Shift cipher:
the English alphabet with the set {0,…, 25} (so a = 0, b =1, etc.). The message space ℳ is then any finite sequence of integers from this set. Encryption of the message _m_ = _m_1 ⋯ _m_ℓ (where _mi_ ∈ {0,…, 25}) using key _k_ is given by
$$ Enc_k(m_1···m_l)=c_1···c_l,where \space c_i=[(m_i+k)mod\space26]$$
Decryption of a ciphertext _c_ = _c_1 ⋯ _cℓ_ using key _k_ is given by
$$Dec_k(c_1···c_l)=m_1···m_l,where \space m_i=[(c_i-k)mod\space26]$$
The mono-alphabetic substitution cipher:
![[english_frequency.png|410]]associate the letters of the English alphabet with 0,…, 25. Let _pi_, with 0 ≤ _pi_ ≤ 1, denote the frequency of the _i_th letter in normal English text (i.e., _p_0 = 0.082 using Figure 1.3). Calculation using Figure 1.3 gives
$$\sum^{25}_{i=0}p_i^2\approx0.065$$
Now. say we are given some ciphertext and let _qi_ denote the frequency of the _i_th letter of the alphabet in this ciphertext; i.e., _qi_ is simply the number of occurrences of the _i_th letter of the alphabet in the ciphertext divided by the length of the ciphertext. If the key is _k_, then _pi_ should be roughly equal to _qi_+_k_ for all i because the _i_th letter is mapped to the (_i_ + _k_)th letter. (We use _i_ + _k_ instead of the more cumbersome $[i + k \space mod \space 26]$.) Thus, if we compute
$$I_{j}\stackrel{def}{=}\sum_{i=0}^{25} p_i^2\approx0.065$$

for each value of _j_ ∈ {0,…, 25}, then we expect to find that _Ik_ ≈ 0.065 (where _k_ is the actual key), whereas _Ij_ for _j_ ≠ _k_ will be different from 0.065. This leads to a key-recovery attack that is easy to automate: compute _Ij_ for all _j_, and then output the value _k_ for which _Ik_ is closest to 0.065.

The Vigenère (poly-alphabetic shift) cipher:
let qi denote the observed frequency of the ith letter in this stream; this is simply the number of occurrences of the ith letter of the alphabet divided by the total number of letters in the stream. If the shift used here is j (i.e., if the first character k1 of the key is equal to j), then for all i we expect qi+j ≈ pi, where pi is the frequency of the ith letter of the alphabet in standard English text. (Once again, we use qi+j in place of q[i+j mod 26].) But this means that the sequence q0,…, q25 is just the sequence p0, …, p25 shifted j places. As a consequence (cf. Equation (1.1)):

$$\sum^{25}_{i=0}q_i^2\approx\sum^{25}_{i=0}p_i^2\approx0.065$$
This leads to a nice way to determine the key length t. For τ = 1, 2, …, T, look at the sequence of ciphertext characters c1, c1+τ, c1+2τ, … and tabulate q0, …, q25 for this sequence. Then compute
$$S_\tau\stackrel{def}{=}\sum^{25}_{i=0}q_i^2$$
When τ = t we expect Sτ ≈ 0.065, as discussed above. On the other hand, if τ is not a multiple of t we expect that all characters will occur with roughly equal probability in the sequence c1, c1+τ, c1+2τ, …, and so we expect qi ≈ 1/26 for all i. In this case we will obtain
$$S_\tau\approx\sum^{25}_{i=0}(\frac{1}{26})^2\approx0.038$$

The smallest value of τ for which Sτ ≈ 0.065 is thus likely the key length. One can further validate a guess τ by carrying out a similar calculation using the second stream c2, c2+τ, c2+2τ,.…, etc.

## 1.4 Principles of Modern Cryptography
### 1.4.1 Principle 1 — Formal Definitions
_regardless of any information an attacker already has, a ciphertext should leak no_ additional _information about the underlying plaintext

### 1.4.2 Principle 2 – Precise Assumptions
_Validation of assumptions:_
_Comparison of assumptions_
_Understanding the necessary assumptions_
### 1.4.3 Principle 3 – Proofs of Security
Proofs of security give an iron-clad guarantee—relative to the definition and assumptions—that no attacker will succeed; this is much better than taking an unprincipled or heuristic approach to the problem.

### 1.4.4 ### Provable Security and Real-World Security

To attack a provably secure scheme in the real world, the attacker is forced to focus attention on the definition (i.e., to explore how the idealized definition differs from the real-world requirements) or the underlying assumptions (i.e., to see whether they hold). In turn, it is the job of cryptographers to continually refine their definitions to more closely match the real world, and to investigate their assumptions to test their validity