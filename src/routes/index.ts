import { Router } from "express";
import authRoutes from "../app/module/auth/auth.route";
import userRoutes from "../app/module/user/user.route";
import categoryRoutes from "../app/module/category/category.route";
import specificationKeyRoutes from "../app/module/specification_key/specification_key.route";
import specificationSectionRoutes from "../app/module/specification_section/specification_section.route";
import brandRoutes from "../app/module/brand/brand.route";
import productRoutes from "../app/module/product/product.route";

interface IApplicationRoute {
  path: string;
  route: Router;
}
const router = Router();
const applicationRoutes: IApplicationRoute[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/specification-key",
    route: specificationKeyRoutes,
  },
  {
    path: "/specification-section",
    route: specificationSectionRoutes,
  },
  {
    path: "/brand",
    route: brandRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
];

applicationRoutes.forEach((route: IApplicationRoute) =>
  router.use(route.path, route.route),
);

export default router;
