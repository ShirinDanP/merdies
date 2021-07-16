import Registry from './Registry';

const registry = new Registry();

export const registerServices = registry.register;

export default registry.exposeRegistered();
