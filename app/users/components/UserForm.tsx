"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createUserSchema,
  updateUserSchema,
  UserFormValues,
} from "../schemas/user.schema";

interface Role {
  id: string;
  name: string;
}

interface Branch {
  id: string;
  name: string;
}

interface UserFormProps {
  mode: "create" | "edit";

  defaultValues?: Partial<UserFormValues>;

  roles: Role[];

  branches: Branch[];

  isLoading?: boolean;

  onSubmit: (values: UserFormValues) => void;
}

export default function UserForm({
  mode,
  defaultValues,
  roles,
  branches,
  isLoading,
  onSubmit,
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      mode === "create" ? createUserSchema : updateUserSchema,
    ) as any,

    defaultValues: {
      name: "",
      email: "",
      branchId: "",
      roleId: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? "",
        email: defaultValues.email ?? "",
        branchId: defaultValues.branchId ?? "",
        roleId: defaultValues.roleId ?? "",
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* NAME */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* EMAIL */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* PASSWORD */}

        {mode === "create" && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* BRANCH */}

        <FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ROLES */}

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {roles.map((role: Role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create User"
              : "Update User"}
        </Button>
      </form>
    </Form>
  );
}
