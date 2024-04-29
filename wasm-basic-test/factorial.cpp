#include <stdint.h>

extern "C"
{
    // Calculates the factorial of a non-negative integer n.
    uint64_t factorial(unsigned int n)
    {
        uint64_t result = 1;
        for (unsigned int i = 2; i <= n; ++i)
        {
            result *= i;
        }
        return result;
    }
}