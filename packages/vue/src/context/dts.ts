import path from 'path';
import type { ElegantRouterFile, ElegantRouterNamePathEntry } from '@elegant-router/core';
import { ROOT_ROUTE_KEY, ROOT_PATH, NOT_FOUND_ROUTE_KEY, NOT_FOUND_PATH } from '../constants';
import type { ElegantVueRouterOption } from '../types';
import { createFs } from '../shared/fs';

function getDtsCode(files: ElegantRouterFile[], entries: ElegantRouterNamePathEntry[]) {
  let code = `/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

declare module "@elegant-router/types" {
  /**
   * the root route key
   */
  export type RootRouteKey = "${ROOT_ROUTE_KEY}";

  /**
   * the root path
   */
  export type RootRoutePath = "${ROOT_PATH}";

  /**
   * the not found route, which catch the invalid route path
   */
  export type NotFoundRouteKey = "${NOT_FOUND_ROUTE_KEY}";

  /**
   * the not found route path, which catch the invalid route path
   */
  export type NotFoundRoutePath = "${NOT_FOUND_PATH}";

  /**
   * route map
   */
  export type RouteMap = {
    "${ROOT_ROUTE_KEY}": "${ROOT_PATH}";
    "${NOT_FOUND_ROUTE_KEY}": "${NOT_FOUND_PATH}";`;

  entries.forEach(([routeName, routePath]) => {
    code += `\n    "${routeName}": "${routePath}";`;
  });

  code += `
  };

  /**
   * route key
   */
  export type RouteKey = keyof RouteMap;

  /**
   * the last level route, which has the page file
   */
  export type LastLevelRoute = Extract<
    RouteKey,`;

  files.forEach(file => {
    code += `\n    | "${file.routeName}"`;
  });

  code += `
  >;\n}\n`;

  return code;
}

export async function genDtsFile(
  files: ElegantRouterFile[],
  entries: ElegantRouterNamePathEntry[],
  options: ElegantVueRouterOption
) {
  if (files.length === 0) return;

  const fs = await createFs();

  const code = getDtsCode(files, entries);

  const dtsPath = path.join(options.cwd, options.dtsDir);

  try {
    await fs.ensureFile(dtsPath);
  } catch {}

  await fs.writeFile(dtsPath, code);
}
