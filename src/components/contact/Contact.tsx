import React, { FC, Fragment } from 'react'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from "yup";
import { FormControl, Select, TextField, makeStyles, Theme, createStyles, MenuItem, Button } from '@material-ui/core';

interface InitialValues {
    contact: string
    career: string
}

interface ContactProps {
    info: InitialValues
    setInfo: (initialValues: InitialValues) => void
    handleNext: () => void
    handleBack: () => void
    steps: string[]
    activeStep: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
        margin: '7px 0px',
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    error: {
        color: 'tomato',
        fontSize: '12px',
        paddingLeft: '5px'
    }
  }),
);

const validationSchema = Yup.object().shape<InitialValues>({
    contact: Yup.string()
        .min(11, 'Requires 11 digits')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Valid Phone Number Required')
        // .integer("A phone number can't include a decimal point")
        // .positive("A phone number can't start with a minus")
        .required('Required'),
    career: Yup.string()
        .required('Required')
})

export const Contact: FC<ContactProps> = ({ info, setInfo, steps, activeStep, handleNext, handleBack }) => {
    const initialValues: InitialValues = info
    const classes = useStyles()
    
    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    setInfo(values)
                    handleNext()
                } }
            >
                <div style={{width: '345px', maxWidth: '320px', margin: "0 auto", overflow: 'hidden' }}>
                <Form>
                <Field style={{ margin: '7px 0px' }} as={TextField} name='contact' variant='outlined' label='Contact' fullWidth />
                <ErrorMessage name='contact' >
                    {(msg) =>  <span className={classes.error}>{msg} </span>}
                </ErrorMessage>
                <FormControl variant='outlined' className={classes.textBox}>
                    <Field style={{ margin: '7px 0px' }} as={Select} name='career' variant='outlined' label='Career' fullWidth > 
                        <MenuItem value=''> <em>None</em> </MenuItem>
                        <MenuItem value={'Developer'}>{'Developer'} </MenuItem>
                        <MenuItem value={'Designer'}>{'Designer'} </MenuItem>
                        <MenuItem value={'Client'}>{'Client'} </MenuItem>
                    </Field>
                </FormControl>
                <ErrorMessage name='career' >
                    {(msg) =>  <span className={classes.error}>{msg} </span>}
                </ErrorMessage>
                <br/>
                <Button className={classes.button} disabled={activeStep === 0} onClick={handleBack} >
                    Back
                </Button>  
                <Button type='submit' variant="contained" color="primary">
                    {activeStep === steps.length - 1 ? 'Finist' : 'Next'}
                </Button>    
                </Form>       
                   </div>
            </Formik>
        </Fragment>
    )
}
