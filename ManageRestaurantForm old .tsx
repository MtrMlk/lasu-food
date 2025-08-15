import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string().nonempty("Restaurant Name Is Required!"),
  city: z.string().nonempty("City Name Is Required!"),
  country: z.string().nonempty("Country Name Is Required!"),
  deliveryPrice: z.coerce
    .number("Delivery Price must be a number!")
    .min(1, "Delivery Price is required!"),
  estimatedDeliveryTime: z.coerce
    .number("Estimated Delivery Time must be a number!")
    .min(1, "Estimated Delivery Time is required!"),
  cuisines: z.array(z.string()).nonempty("Please Select At Least One Item!"),
  menuItems: z.array(
    z.object({
      name: z.string().nonempty("Is Required!"),
      price: z.coerce.number("Price Must Be A Number!").min(1, "is Required!"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image File Is Required!" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
};

const ManageRestaurantForm = ({ onSave, isPending }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // TODO - convert formDataJson to a new FormData Object
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
