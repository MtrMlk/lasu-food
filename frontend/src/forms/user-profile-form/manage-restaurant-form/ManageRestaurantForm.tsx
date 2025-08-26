import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { type Restaurant } from "../../../types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z
      .string("Restaurant Name Is Required!")
      .nonempty({ error: "Restaurant Name Is Required!" }),
    shopNumber: z.string().optional(),
    shopAddress: z
      .string({ error: "Shop Address Is Required!" })
      .nonempty({ error: "Shop Address Is Required!" }),
    shopLocation: z
      .string("Shop Location Is Required!")
      .nonempty("Shop Location Is Required!"),
    campus: z.enum(["ojo", "epe"], {
      error: "Campus must be either Ojo or Epe!",
    }),
    deliveryPrice: z.coerce
      .number<number>("Delivery Price must be a number!")
      .min(1, "Delivery Price is required!"),
    estimatedDeliveryTime: z.coerce
      .number<number>("Estimated Delivery Time must be a number!")
      .min(1, "Estimated Delivery Time is required!"),
    cuisines: z
      .array(z.string({ error: "Please Select At Least One Item!" }))
      .nonempty("Please Select At Least One Item!"),
    menuItems: z.array(
      z.object({
        name: z.string().nonempty("Is Required!"),
        price: z.coerce
          .number<number>("Price Must Be A Number!")
          .min(1, "is Required!"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "Image File Is Required!" })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided!",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
};

const ManageRestaurantForm = ({ onSave, isPending, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    // price to lowest denomination
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);

    if (formDataJson.shopNumber) {
      formData.append("shopNumber", formDataJson.shopNumber);
    }
    formData.append("shopAddress", formDataJson.shopAddress);
    formData.append("shopLocation", formDataJson.shopLocation);
    formData.append("campus", formDataJson.campus);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isPending ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
