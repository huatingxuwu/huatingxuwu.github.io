### 1.1 
Decrypt the ciphertext provided at the end of the section on mono-alphabetic substitution ciphers.

JGRMQOYGHMVBJWRWQFPWHGFFDQGFPFZRKBEEBJIZQQOCIBZKLFAFGQVFZFWWE OGWOPFGFHWOLPHLRLOLFDMFGQWBLWBWQOLKFWBYLBLYLFSFLJGRMQBOLWJVFP FWQVHQWFFPQOQVFPQOCFPOGFWFJIGFQVHLHLROQVFGWJVFPFOLFHGQVQVFILE OGQILHQFQGIQVVOSFAFGBWQVHQWIJVWJVFPFWHGFIWIHZZRQGBABHZQOCGFHX

It may be assumed that we efface the effects of illegal acts in our own office first. She shows that her horse was the phenomenon, but the public believe she is lying till the end that tension is responsibility. She is, which is no longer whose other the house shancing changes town because that is, it is this. The thief with difficulty makes

### 1.2
Provide a formal definition of the Gen, Enc, and Dec algorithms for the mono-alphabetic substitution cipher.

$$\mathcal{M} = \text{finite alphabet}, \quad \text{Perm}(\mathcal{M}) = \text{set of all permutations over } \mathcal{M}$$

### 1. $\text{Gen}$

- **Output**: $k \leftarrow \text{Perm}(\mathcal{M})$

### 2. $\text{Enc}$

- **Input**: Key $k$, Plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathcal{M}$)
    
- **Output**: Ciphertext $C = c_1 c_2 \dots c_n$ ($c_i \in \mathcal{M}$), where:
    
    $$c_i = k(m_i) \quad \forall i \in \{1, \dots, n\}$$
### 3. $\text{Dec}$

- **Input**: Key $k$, Ciphertext $C = c_1 c_2 \dots c_n$ ($c_i \in \mathcal{M}$)
    
- **Output**: Plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathcal{M}$), where:
    
    $$m_i = k^{-1}(c_i) \quad \forall i \in \{1, \dots, n\}$$
### Correctness

$$\forall k \leftarrow \text{Gen}, \forall M \in \mathcal{M}^*: \quad \text{Dec}_k(\text{Enc}_k(M)) = M$$

### 1.3 
Provide a formal definition of the `Gen`, `Enc`, and `Dec` algorithms for the Vigenère cipher. (Note: there are several plausible choices for `Gen`; choose one.)

$$\mathcal{M} = \mathbb{Z}_{26}^n, \quad \mathcal{K} = \mathbb{Z}_{26}^\ell \quad (\text{where } \ell \text{ is a fixed key length})$$

### 1. $\text{Gen}$

- **Output**: $k = (k_1, k_2, \dots, k_\ell) \leftarrow \mathbb{Z}_{26}^\ell$ (chosen uniformly at random)
    

### 2. $\text{Enc}$

- **Input**: Key $k \in \mathcal{K}$, Plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathbb{Z}_{26}$)
    
- **Output**: Ciphertext $C = c_1 c_2 \dots c_n$ ($c_i \in \mathbb{Z}_{26}$), where:
    
    $$c_i = [m_i + k_{(i-1 \bmod \ell) + 1}] \bmod 26 \quad \forall i \in \{1, \dots, n\}$$
    

### 3. $\text{Dec}$

- **Input**: Key $k \in \mathcal{K}$, Ciphertext $C = c_1 c_2 \dots c_n$ ($c_i \in \mathbb{Z}_{26}$)
    
- **Output**: Plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathbb{Z}_{26}$), where:
    
    $$m_i = [c_i - k_{(i-1 \bmod \ell) + 1}] \bmod 26 \quad \forall i \in \{1, \dots, n\}$$
    

### Correctness

$$\forall k \in \mathcal{K}, \forall M \in \mathcal{M}: \quad \text{Dec}_k(\text{Enc}_k(M)) = M$$

### 1.4
Say you are given a ciphertext that corresponds to English-language text that was encrypted using either the shift cipher or the Vigenère cipher with period greater than 1. How could you tell which was the case?

By calculating the **Index of Coincidence (IC)** of the ciphertext. The IC measures the probability that two randomly chosen letters from the text are identical.

- **If the IC is close to 0.065**, it was encrypted with the **shift cipher**. Because a shift cipher shifts every letter by the same amount, it preserves the relative letter frequencies of natural English.
- **If the IC is significantly lower (closer to 0.038)**, it was encrypted with the **Vigenère cipher**. Because it uses multiple shifts, it flattens the letter frequency distribution, pushing the IC toward a completely random distribution of English letters .
    
### 1.5
Implement the attacks described in this chapter for the shift cipher and the Vigenère cipher.

### 1.6
The shift and Vigenère ciphers can also be defined on the 256-character alphabet consisting of all possible bytes (8-bit strings), and using XOR instead of modular addition
(a)Provide a formal definition of both schemes in this case.
(b)Discuss how the attacks we have shown in this chapter can be modified to break these schemes.
#### (a) Formal Definitions (XOR variants over $\{0,1\}^8$)

Let $\mathcal{B} = \{0,1\}^8$ denote the set of all possible bytes.

#### 1. Shift Cipher Variant (Byte-Shift / 1-Byte XOR)

- **$\text{Gen}$**: Choose a key $k \in \mathcal{B}$ uniformly at random.
    
- **$\text{Enc}_k(M)$**: Given plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathcal{B}$), compute ciphertext $C = c_1 c_2 \dots c_n$ where:
    
    $$c_i = m_i \oplus k \quad \forall i \in \{1, \dots, n\}$$
    
- **$\text{Dec}_k(C)$**: Given ciphertext $C = c_1 c_2 \dots c_n$, compute plaintext $M = m_1 m_2 \dots m_n$ where:
    
    $$m_i = c_i \oplus k \quad \forall i \in \{1, \dots, n\}$$
    

#### 2. Vigenère Cipher Variant (Multi-Byte XOR)

Let $\ell$ be a fixed key length.

- **$\text{Gen}$**: Choose a key $k = (k_1, k_2, \dots, k_\ell) \in \mathcal{B}^\ell$ uniformly at random.
    
- **$\text{Enc}_k(M)$**: Given plaintext $M = m_1 m_2 \dots m_n$ ($m_i \in \mathcal{B}$), compute ciphertext $C = c_1 c_2 \dots c_n$ where:
    
    $$c_i = m_i \oplus k_{(i-1 \bmod \ell) + 1} \quad \forall i \in \{1, \dots, n\}$$
    
- **$\text{Dec}_k(C)$**: Given ciphertext $C = c_1 c_2 \dots c_n$, compute plaintext $M = m_1 m_2 \dots m_n$ where:
    
    $$m_i = c_i \oplus k_{(i-1 \bmod \ell) + 1} \quad \forall i \in \{1, \dots, n\}$$
#### (b) Modifications to the Attacks

#### 1. Attacking the Shift Cipher Variant

The classical attack relies on a brute-force search over the key space or a frequency analysis comparison.

- **Brute-Force Modification**: The key space increases from 26 to $2^8 = 256$. A computer can still instantaneously exhaust all 256 keys, decrypting the ciphertext under each candidate key and checking which output yields intelligible English text.
    
- **Frequency Analysis Modification**: Instead of tracking the English alphabet probability vector $\vec{p}$ (size 26), construct a target byte probability vector $\vec{p}$ of size 256 based on English text. For each candidate $k \in \mathcal{B}$, calculate the shifted ciphertext frequency vector $\vec{q}_k$ and find the key that maximizes the inner product $\sum_{i=0}^{255} p_i \cdot q_{k,i}$ or minimizes the Chi-Squared statistic.
    

#### 2. Attacking the Vigenère Cipher Variant

The attack remains a two-step process: finding the period $\ell$, then solving each stream position as an independent shift cipher.

- **Finding the Period ($\ell$)**:
    
    - **Kasiski Examination**: Look for identical, repeating multi-byte sequences in the ciphertext. The distances between these repetitions will likely be multiples of the period $\ell$.
        
    - **Index of Coincidence (IC)**: The formula for IC adapts to the larger alphabet: $\text{IC} = \sum_{i=0}^{255} \frac{f_i(f_i-1)}{n(n-1)}$, where $f_i$ is the count of byte value $i$. For an arbitrary string of English text mapped via ASCII to bytes, the expected $\text{IC}$ is still significantly higher than that of a uniform distribution over 256 bytes ($\frac{1}{256} \approx 0.0039$). By testing stream offsets $1, 2, 3, \dots$ and extracting every $\ell$-th byte, the correct period $\ell$ will yield sub-ciphertexts with an abnormally high IC matching English text baseline properties.
        
- **Recovering the Key**: Once $\ell$ is determined, partition the ciphertext into $\ell$ slices. For each slice $j \in \{1, \dots, \ell\}$, apply the modified frequency analysis or 256-key brute-force described above to recover the individual key byte $k_j$.

### 1.7
The index of coincidence method relies on a known value for the sum of the _squares_ of plaintext-letter frequencies (cf. Equation (1.1)). Why would it not work using the sum Σ_i pi_ itself?

The Index of Coincidence relies on the sum of squares $\sum_{i} p_i^2$ because it measures the probability of a specific event: **randomly picking two characters from a text and having them match.**

### 1. Mathematically, $\sum_{i} p_i$ is a Constant

By definition, the probabilities of all possible outcomes in any probability distribution must sum to 1:

$$\sum_{i} p_i = 1$$
### 2. Squaring captures "Unevenness"

To distinguish between structured language (like English) and random noise (like ciphertext), we need a metric that reacts to how heavily weighted or flat the distribution is.

- **In a uniform distribution**, every byte or letter has the same probability $p_i = \frac{1}{N}$. The sum of squares yields its minimum possible value:
    
    $$\sum_{i=1}^{N} \left(\frac{1}{N}\right)^2 = N \cdot \frac{1}{N^2} = \frac{1}{N}$$
    
- **In a skewed distribution** (natural language), a few characters have very high $p_i$ values Squaring these larger numbers disproportionately inflates the sum, driving the total $\sum_{i} p_i^2$ significantly higher than $\frac{1}{N}$.
    
Without the exponent, you cannot measure this dispersion, making it impossible to detect whether a distribution is flat or spiked.

### 1.8
Show that the shift, substitution, and Vigenère ciphers are all trivial to break using a chosen-plaintext attack. How much chosen plaintext is needed to recover the key for each of the ciphers?

Under a chosen-plaintext attack (CPA), the adversary can feed any plaintext into the encryption oracle and obtain the corresponding ciphertext.

For all three ciphers, the key is recovered by exploiting the deterministic, character-by-character nature of the algorithms.

### 1. Shift Cipher

- **How to break**: Since every character is shifted by the same constant key value $k$, you only need to observe what happens to a single known character.
    
- **Exact plaintexts needed**: **1 character**.
    
- **Method**: Choose the character corresponding to $0$.
    
    - _Modular variant_: If $m_1 = 0$, then $c_1 = (0 + k) \bmod 26 = k$.
        
    - _XOR variant_: If $m_1 = 0$, then $c_1 = 0 \oplus k = k$.
        
    - The observed ciphertext character _is_ the key.
        

### 2. Substitution Cipher

- **How to break**: The key $k$ is a full permutation table mapping each element of the alphabet $\mathcal{M}$ to a unique ciphertext counterpart. To recover the entire table, you must force the oracle to encrypt every unique character in the alphabet.
    
- **Exact plaintexts needed**: **$|\mathcal{M}|$ characters.
    
- **Method**: Query a single message string containing every character of the alphabet exactly once (e.g., $M = \text{"ABC...Z"}$).
    
    - Because $c_i = k(m_i)$, matching the position of each character in the output gives you the exact mapping for that specific input character, fully reconstructing the permutation table $k$.
        

### 3. Vigenère Cipher

#### Case A: If the key length $\ell$ is known

- **How to break**: The cipher acts as $\ell$ independent shift ciphers interleaved sequentially. You only need to target each position of the repeating key period once.
    
- **Exact plaintexts needed**: **$\ell$ characters**.
    
- **Method**: Query a string of $\ell$ zeros.
    
    - _Modular variant_: $c_i = (0 + k_i) \bmod 26 = k_i$.
        
    - _XOR variant_: $c_i = 0 \oplus k_i = k_i$.
        
    - The resulting ciphertext $C = c_1 c_2 \dots c_\ell$ explicitly reveals the complete key stream vector $k$.
        

#### Case B: If the key length $\ell$ is unknown

- **How to break**: You must first determine $\ell$, then extract the key.
    
- **Exact plaintexts needed**: **$2\ell_{max}$ characters**.
    
- **Method**: Query a long string consisting entirely of zeros.
    
    - The resulting ciphertext will simply be the key repeated over and over ($C = k || k || k \dots$).
        
    - The period $\ell$ is immediately visible as the exact distance at which the ciphertext characters begin to repeat. Once $\ell$ is identified from the pattern, the first $\ell$ characters of the ciphertext reveal the key.
    - 
### 1.9
Assume an attacker knows that a user’s password is either abcd or bedg. Say the user encrypts his password using the shift cipher, and the attacker sees the resulting ciphertext. Show how the attacker can determine the user’s password, or explain why this is not possible.

The attacker **can** determine the user's password in this case.

Because the shift cipher uses the same shift value $k$ for every letter within a message, the relationship between the letters in the ciphertext must exactly preserve the relationship between the letters in the plaintext. The attacker can exploit this structural property to eliminate the incorrect password.

### The Attack Method

Let the ciphertext be $C = c_1 c_2 c_3 c_4$.

1. **Calculate the internal differences of the ciphertext:**
    
    The attacker computes the modular distance between consecutive ciphertext characters:
    
    $$\Delta_1 = (c_2 - c_1) \bmod 26$$
    $$\Delta_2 = (c_3 - c_2) \bmod 26$$$$\Delta_3 = (c_4 - c_3) \bmod 26$$
    
2. **Compare with the candidate passwords:**
    
    The shift value $k$ cancels out when subtracting adjacent characters because $c_i = (m_i + k) \bmod 26$. Therefore, the ciphertext differences $(\Delta_1, \Delta_2, \Delta_3)$ must exactly match the plaintext character differences.
    
    Let's look at the internal differences for both possible passwords (converting letters to $0\text{--}25$):
    
    - **Candidate 1: `abcd`** ($m = [0, 1, 2, 3]$)
        
        - $\Delta_1 = (1 - 0) = 1$
            
        - $\Delta_2 = (2 - 1) = 1$
            
        - $\Delta_3 = (3 - 2) = 1$
            
        - _Pattern:_ $(1, 1, 1)$
            
    - **Candidate 2: `bedg`** ($m = [1, 4, 3, 6]$)
        
        - $\Delta_1 = (4 - 1) = 3$
            
        - $\Delta_2 = (3 - 4) \bmod 26 = 25$
            
        - $\Delta_3 = (6 - 3) = 3$
            
        - _Pattern:_ $(3, 25, 3)$
            

### Conclusion

Because the internal difference patterns $(1, 1, 1)$ and $(3, 25, 3)$ are completely distinct, the observed ciphertext will match exactly one of these two patterns. By calculating the differences of the intercepted ciphertext characters, the attacker instantly identifies the true password (and uncovers the shift key $k$ as a byproduct).


### 1.10
Repeat the previous exercise for the Vigenère cipher using period 2, using period 3, and using period 4.

### 1.11

The attack on the Vigenère cipher has two steps: (a) find the key length by identifying $\tau$ with $S_\tau \approx 0.065$ (cf. Equation (1.3)) and (b) for each character of the key, find $j$ maximizing $I_j$ (cf. Equation (1.2)), using $\{p_i\}$ corresponding to English text. What happens in each case if the underlying plaintext is in a language other than English?
#### Case (a): Finding the Key Length (Equation 1.3)

The step **will still work**, but the target threshold value will change depending on the language.

The attack relies on the fact that natural languages have an uneven distribution of letters (yielding a high sum of squares), whereas a multi-key Vigenère cipher flattens the distribution toward uniform randomness ($\approx 0.038$ for a 26-letter alphabet). Most major languages have a characteristic Index of Coincidence ($S_\tau$) that is significantly higher than a random distribution.

If the underlying plaintext is in a different language, the attacker simply replaces $0.065$ with that language's specific baseline IC value. For example:

- **French:** $\approx 0.078$
    
- **German:** $\approx 0.076$
    
- **Spanish:** $\approx 0.074$
    
- **Russian (32-letter alphabet):** $\approx 0.053$
    
The attack only fails or becomes extremely difficult if the target language has an inherently flat letter distribution where the natural IC sits too close to the uniform distribution threshold ($1/|\mathcal{M}|$).

#### Case (b): Finding each Character of the Key (Equation 1.2)

If the attacker uses the $\{p_i\}$ vector corresponding to English text on a non-English plaintext, **the attack will fail to find the correct key characters.**

Equation (1.2) acts as a dot-product correlation wrapper. It reaches its maximum peak when the spikes of the observed ciphertext distribution ($q$) align perfectly with the spikes of the language's natural distribution ($p$).

Because different languages have completely different letter frequencies (for example, 'E' is dominant in English and French, but 'A' and 'O' are much more frequent in Spanish, and 'Z' or 'K' appear with vastly different weights in German), using the English $\{p_i\}$ distribution template means the mathematical correlations will mismatch. The maximum value of $I_j(g)$ will likely land on an incorrect shift value $g$, resulting in a corrupted, garbled key.

**How to fix it:** The attacker must swap out the English profile $\{p_i\}$ for the true relative letter frequencies of the target language. Once the correct language profile is plugged into the formula, the maximization step works exactly the same way.