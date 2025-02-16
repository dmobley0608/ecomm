export type ActionState = {
  message: string;
};

export type FormAction<T> = (prevState: ActionState, formData: T) => Promise<ActionState | undefined>;
