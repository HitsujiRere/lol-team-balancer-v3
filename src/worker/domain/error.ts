type ErrorTemplate = {
  message: string;
};

export const dataNotFound = () =>
  ({
    message: "Data not found",
  }) as const satisfies ErrorTemplate;

export type DataNotFound = ReturnType<typeof dataNotFound>;

export const internalServerError = () =>
  ({
    message: "Internal server error",
  }) as const satisfies ErrorTemplate;

export type InternalServerError = ReturnType<typeof internalServerError>;

export type ApiError = DataNotFound | InternalServerError;
