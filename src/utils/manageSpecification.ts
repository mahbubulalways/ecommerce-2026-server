interface Spec {
  id: string;
  name: string;
  unit?: string | null;
  value: string;
}

interface Section {
  id: string;
  name: string;
  specs: Spec[];
}

export const manageSpecification = (product: any): Section[] => {
  const sectionMap: Record<string, Section> = {};

  product.productSpecifications.forEach((ps: any) => {
    const sectionName = ps.section?.name || "Unknown Section";
    const sectionId = ps.section?.id || "Unknown Section";

    if (!sectionMap[sectionName]) {
      sectionMap[sectionName] = {
        id: sectionId,
        name: sectionName,
        specs: [],
      };
    }

    sectionMap[sectionName].specs.push({
      id: ps.spec.id,
      name: ps.spec.name,
      unit: ps.spec.unit || null,
      value: ps.value,
    });
  });

  return Object.values(sectionMap);
};
