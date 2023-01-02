import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Divider, Form, Header, Item, Segment } from 'semantic-ui-react';
import { useCreateCategoryMutation } from '../../redux/apis/categories';
import { CategoryFormInputs } from './CategorForm.types';
import locals from '../../locals/en.json';

const CategoryForm = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const formvValidation = {
    name: { required: true },
    description: { required: true }
  };

  const submitCategory = ({ name, description }: CategoryFormInputs) => {
    createCategory({ name, description });
  };
  useEffect(() => {
    if (!isLoading) reset();
  }, [isLoading, reset]);

  return (
    <Item>
      <Header color="teal">{locals.addcategory}</Header>
      <Segment>
        <Form onSubmit={handleSubmit(submitCategory)}>
          <Controller
            name="name"
            rules={formvValidation.name}
            control={control}
            render={({ field }) => (
              <Form.Input
                fluid
                {...formvValidation.name}
                label={locals.name}
                {...field}
                placeholder={locals.name}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={formvValidation.name}
            render={({ field }) => (
              <Form.TextArea
                fluid
                label={locals.description}
                {...formvValidation.name}
                {...field}
                placeholder={locals.description}
              />
            )}
          />

          <Divider />
          <Form.Button type="submit" color="teal" disabled={!isValid}>
            {locals.save}
          </Form.Button>
        </Form>
      </Segment>
    </Item>
  );
};
export default CategoryForm;
