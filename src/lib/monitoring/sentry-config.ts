// Mock sentry functions for development
export const addBreadcrumb = () => {};
export const measureTime = async <T>(name: string, operation: string, fn: () => Promise<T>) => fn();
export const reportError = (error: any) => console.warn("Error:", error);
export const reportMessage = (msg: string) => console.log(msg);
