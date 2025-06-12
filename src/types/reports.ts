export interface ReportData {
  projects: {
    _id: string;
    name: string;
    products: number;
  }[];
  userVsProduct: {
    _id: {
      id: string;
      name: string;
    };
    products: [
      {
        product: {
          id: string;
          name: string;
        };
        count: number;
      }
    ];
  }[];
}
