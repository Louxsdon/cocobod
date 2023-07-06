import { usePage } from "@inertiajs/react";

export const useAuthorization = () => {
    const { auth } = usePage().props;

    const hasRole = (roleName) =>
        auth.user.roles.some((role) => role.name === roleName);

    const hasPermission = (permissionName) =>
        auth.user.permissions.some(
            (permission) => permission.name === permissionName
        );

    return { hasRole, hasPermission };
};
