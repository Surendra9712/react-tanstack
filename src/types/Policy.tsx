import PolicyCategory from "./PolicyCategory";

interface Policy {
    id?: number;
    title: string;
    category: PolicyCategory;
    content: string;
    contentLocation: string;
  }
  
  export default Policy;