import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { useRouter } from 'src/hooks';
import styles from './VerifyEmailForm.module.css';
import OtpField from 'src/components/OtpField';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  email: yup
    .string()
    .required('*Vui lòng nhập địa chỉ email của bạn')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Vui lòng nhập đúng địa chỉ email của bạn',
    ),
});

export default function VerifyEmailForm() {
  const { back } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);

      setFocus('email');
      reset();
    }
  };

  return (
    <section className={mk('reset-password')}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <h5
          className={mk('title m-auto mt-4 font-primary font-bold text-xl leading-7 text-primary')}
        >
          Vui lòng kiểm tra email của bạn!
        </h5>
        <p className={mk('description')}>
          Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email tới
          <strong> ngockhoi@gmail.com</strong>, vui lòng nhập mã vào ô bên dưới để xác minh email
          của bạn.
        </p>
        <OtpField />
        <Button primary wrapper={mk('btn-submit')}>
          Xác nhận
        </Button>
        <p>
          Chưa nhận được mã?{' '}
          <Button text title="font-semibold text-primary-2 hover:underline underline-offset-4">
            Gửi lại mã
          </Button>
        </p>
      </FormProvider>
    </section>
  );
}
