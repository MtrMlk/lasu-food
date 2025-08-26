import {
  FormControl,
  FormDescription,
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
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold"> Details</h2>
        <FormDescription>
          {" "}
          Enter The Details About Your Restuarant{" "}
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Canteen Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g. Amala Plus"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name="shopNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Shop Number (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="e.g., Shop 15"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="campus"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Campus</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select campus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ojo">Ojo Campus (Main)</SelectItem>
                  <SelectItem value="epe">Epe Campus</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="shopAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g., Science Market"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shopLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop Location Description</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="e.g., Faculty of Science"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Delivery Price (₦)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="500.50" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delivery Time (Minutes)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
