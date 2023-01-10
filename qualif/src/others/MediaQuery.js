const BREAKPOINTS = [576, 768, 992, 1200];

const MEDIA_QUERY = BREAKPOINTS.map((e) => `@media (max-width: ${e}px)`);

export default MEDIA_QUERY;