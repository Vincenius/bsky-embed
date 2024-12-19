export interface DateFormat {
  type?: 'relative' | 'absolute';
  locale?: string;
  options?: {
    weekday?: string,
    year?: string,
    month?: string,
    day?: string,
  }
}