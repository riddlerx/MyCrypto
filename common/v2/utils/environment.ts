export const IS_DEV: boolean = process.env.NODE_ENV === 'development';

export const IS_PROD: boolean = process.env.NODE_ENV === 'production';

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

export const hasWeb3Provider = (): boolean => window && ('web3' in window || 'ethereum' in window);
