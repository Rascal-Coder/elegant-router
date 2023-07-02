// import path from 'path';
// import type { RouteRecordRaw } from 'vue-router';
// import { loadFile, writeFile, parseModule } from 'magicast';
// import type { ElegentRouterFile, ElegentRouterTree } from '@elegent-router/core';
// import { createFs } from '../shared/fs';
// import type { ElegentVueRouterOption } from '../types';

// interface RouteConstExport {
//   autoRoutes: RouteRecordRaw[];
// }

// export async function getConstCode(
//   files: ElegentRouterFile[],
//   trees: ElegentRouterTree[],
//   options: ElegentVueRouterOption
// ) {
//   const { cwd, constDir, splitModule, customConstRoutes } = options;

//   const fs = await createFs();

//   if (splitModule) {
//     // const moduleFilePath = path.join(cwd, dir, ROUTES_MODULE_DIR, ROUTES_FILE_NAME);
//   } else {
//     const routesFilePath = path.join(cwd, constDir);
//     try {
//       await fs.ensureFile(routesFilePath);
//     } catch {
//       createEmptyRouteConst(routesFilePath);
//     }

//     const md = await loadFile<RouteConstExport>(routesFilePath);
//   }
// }

// async function createEmptyRouteConst(filePath: string) {
//   const code = `// Generated by elegent-router
// // Read more: https://github.com/soybeanjs/elegent-router
// import type { RouteRecordRaw } from "vue-router";

// export const autoRoutes: RouteRecordRaw[] = [];

// `;

//   const mod = parseModule<RouteConstExport>(code);

//   writeFile({ ast: mod.exports.$ast }, filePath);
// }

// export function updateRouteConst(oldConst: RouteConstExport, newConst: RouteConstExport) {}

// function getRouteConstExport(files: ElegentRouterFile[], trees: ElegentRouterTree[]) {
//   const autoRoutes: RouteRecordRaw[] = [];

//   return { autoRoutes };
// }

// function transformRouterTreesToRouteRecordRaws(trees: ElegentRouterTree[], files: ElegentRouterFile[]) {
//   const routes = trees.map(tree => {
//     const hasChildren = Number(tree?.children?.length) > 0;
//   });

//   return routes;
// }

// // eslint-disable-next-line max-params
// function transformRouteTreeToRouteRecordRaw(
//   tree: ElegentRouterTree,
//   files: ElegentRouterFile[],
//   options: ElegentVueRouterOption,
//   oneLevel = true
// ) {
//   const { routeName, routePath, children = [] } = tree;

//   const hasChildren = children.length > 0;

//   if (!hasChildren && oneLevel) {
//     const oneLevelRoute: RouteRecordRaw = {
//       name: routeName,
//       path: routePath,
//       component: () => {},
//       children: [
//         {
//           path: '.',
//           component: () => {}
//         }
//       ]
//     };

//     return oneLevelRoute;
//   }

//   const oneLevelRoute: RouteRecordRaw = {
//     name: routeName,
//     path: routePath,
//     component: () => {}
//   };
// }

// const importsPath = path.join(cwd, importsDir);
// const routeModulePath = path.join(cwd, moduleDir, `${routeName}.ts`);
// const constPath = path.join(cwd, constDir);

// const compoentPath = splitModule
//   ? getRelativeImport(routeModulePath, importsPath)
//   : getRelativeImport(constPath, importsPath);

// export function getRelativeImport(from: string, to: string) {
//   let relativePath = path.relative(path.dirname(from), to);

//   if (!relativePath.startsWith('.')) {
//     relativePath = path.format({ dir: '.', name: relativePath });
//   }

//   const ext = path.extname(relativePath);

//   if (ext) {
//     relativePath = relativePath.replace(ext, '');
//   }

//   return relativePath;
// }
