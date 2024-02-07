const eventBus = {
    on(event: string, callback: EventListener) {
      document.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: string | number | boolean | object | null | undefined) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event: string, callback: EventListener) {
      document.removeEventListener(event, callback);
    },
  };
  
  export default eventBus;