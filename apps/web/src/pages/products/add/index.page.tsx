import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FileButton,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from 'resources/product/product.api';
import { handleError } from 'utils';
import { z } from 'zod';

const schema = z.object({
  productName: z.string().min(4).max(50),
  price: z.number(),
});

type AddProductParams = z.infer<typeof schema>;

const AddProduct = () => {
  const [file, setFile] = useState<File | null>();
  const [objectPreview, setObjectPreview] = useState<any>();

  const router = useRouter();

  const { mutate: createProduct, isLoading: isCreateProductLoading } = useCreateProduct();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<AddProductParams>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (file) {
      setObjectPreview(URL.createObjectURL(file));
    }
  }, [file]);

  const onSubmit = (data: AddProductParams) => {
    if (file) {
      const payload = new FormData();
      payload.append('productName', data.productName);
      payload.append('price', `${data.price}`);
      payload.append('file', file);

      createProduct(payload, {
        onSuccess: () => {
          router.push('/products');
        },
        onError: (e) => handleError(e, setError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack w="50%">
        <Title size="h2">Create new product</Title>
        <Group>
          <Image
            src={objectPreview || '../images/placeholder.jpg'}
            width={180}
            height={180}
            alt="Product image"
            radius="md"
          />
          <FileButton
            onChange={(f) => {
              setFile(f);
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Button color="gray" variant="outline" {...props}>
                <Text weight={600}>Upload photo</Text>
              </Button>
            )}
          </FileButton>
        </Group>

        <TextInput
          {...register('productName')}
          mt="lg"
          width="50%"
          label="Title of the product"
          placeholder="Enter title of the product..."
          size="sm"
          error={errors.productName?.message}
        />
        <TextInput
          {...register('price', { valueAsNumber: true })}
          width="50%"
          label="Price"
          placeholder="Enter price of the product..."
          size="sm"
          type="number"
          error={errors.price?.message}
        />
        <Button
          loading={isCreateProductLoading}
          type="submit"
          w="30%"
          ml="auto"
          size="sm"
        >
          Upload product
        </Button>
      </Stack>
    </form>
  );
};

export default AddProduct;
