export const ENDPOINTS = {
  USER: {
    CREATE_EMPLOYEE: "/create-employee",
  },
  AUTH: {
    LOGIN: "/login",
    VERIFY: "/verify",
    RESEND_CODE: "/resend-code",
    FIND_ACCOUNT: "/find-account",
    PASSWORD_RESET: "/reset-password",
  },
  CATEGORY: {
    CREATE_CATEGORY: "/create-category",
    GET_PARENT_CATEGORY: "/parent",
    GET_ALL_CATEGORY: "/all",
    SPECIFICATION: "/specification/:id",
    INSERT_SPECIFICATION_SECTION_TO_CATEGORY:
      "/insert-specification-section-to-category",
  },
  SPECIFICATION_KEY: {
    CREATE_SPECIFICATION_KEY: "/create",
    GET_SPECIFICATION_KEYS: "/retrieve",
    GET_SPECIFICATION_KEY_FOR_SECTION: "/section",
  },
  SPECIFICATION_SECTION: {
    CREATE_SPECIFICATION_SECTION: "/create",
    GET_SPECIFICATION_SECTIONS: "/retrieve",
    INSERT_SPECIFICATION_KEY_TO_SECTION: "/insert-specification-key-to-section",
    GET_SPECIFICATION_SECTION_FOR_CATEGORY: "/category",
  },
  BRAND: {
    CREATE_BRAND: "/create",
    GET_BRANDS: "/retrieve",
    GET_BRANDS_FOR_INSERT_PRODUCT: "/name",
  },
  PRODUCT: {
    CREATE_PRODUCT: "/create",
    GET_PRODUCTS_FOR_ADMIN: "/admin",
    GET_PRODUCT_DETAILS_FOR_ADMIN: "/admin/details/:slug",
  },
};
