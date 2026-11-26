import { describe, it, expect } from 'vitest'
import { formatUSDC, truncateAddress, formatRelativeTime } from '../format'

describe('formatUSDC', () => {
  it('formats integer amounts', () => {
    expect(formatUSDC(100)).toBe('100.00 USDC')
  })

  it('formats decimal amounts', () => {
    expect(formatUSDC(1234.5)).toBe('1,234.50 USDC')
  })

  it('handles string input', () => {
    expect(formatUSDC('500')).toBe('500.00 USDC')
  })

  it('handles zero', () => {
    expect(formatUSDC(0)).toBe('0.00 USDC')
  })
})

describe('truncateAddress', () => {
  it('truncates long addresses', () => {
    const addr = 'GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UVIIDHJ7L3SCAPTUQAH'
    expect(truncateAddress(addr)).toBe('GBZX...UQAH')
  })

  it('returns short addresses unchanged', () => {
    expect(truncateAddress('GABCD')).toBe('GABCD')
  })

  it('supports custom char count', () => {
    const addr = 'GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UVIIDHJ7L3SCAPTUQAH'
    expect(truncateAddress(addr, 6)).toBe('GBZXN7...TUQAH')
  })
})

describe('formatRelativeTime', () => {
  it('shows "just now" for recent times', () => {
    expect(formatRelativeTime(new Date())).toBe('just now')
  })
})
