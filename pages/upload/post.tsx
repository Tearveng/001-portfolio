import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Textarea,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import HeaderNavigator from "../nav/header";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { SAVE_PHOTO, UPLOADPOST } from "../../lib/graphql/graphq";
import { Authentication } from "../../lib/authentication/auth";
import TextAreaEditor from "./textarea";
import "react-quill/dist/quill.snow.css";
import Footer from "../nav/footer";

interface Detail {
  id: number;
  condition: boolean;
  title: string;
  description: string;
  image: string;
  imageUpload: string;
}

const ControllInput = ({ OnUpdate, type, title }: any) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    OnUpdate(e.target.value);
  };

  return (
    <Input
      placeholder={title}
      autoComplete="off"
      _placeholder={{ color: "gray.500" }}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};

const TextAreaInput = ({ OnUpdate }: any) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    OnUpdate(e.target.value);
  };

  return (
    <Textarea
      placeholder="Description"
      _placeholder={{ color: "gray.500" }}
      value={value}
      onChange={handleChange}
    />
  );
};
const ImageInput = ({ OnUpdate, imageCloud }: any) => {
  const handleChange = (e: any) => {
    const [file] = e.target.files;
    imageCloud(URL.createObjectURL(file));
    OnUpdate(file);
  };

  return (
    <Input
      type="file"
      display="none"
      id="file_upload"
      name="file-upload"
      onChange={handleChange}
    ></Input>
  );
};

const UploadPost = () => {
  const router = useRouter();
  const { data: me, loading } = Authentication();
  const title = useRef();
  const desciption = useRef();
  const image = useRef("");
  const [changeImage, setChangeImage] = useState("");
  const [deleteDetail, setDeleteDetail] = useState<Detail[]>([
    {
      id: 0,
      condition: false,
      title: "",
      description: "",
      image: "",
      imageUpload: "",
    },
  ]);

  const handleChange = (e: any, index: number) => {
    e.preventDefault();
    const title = e.target.value;
    deleteDetail.map((x) => (x.id === index ? { ...x, title } : x));
  };

  const [errorInput, setErrorInput] = useState({
    title: false,
    description: false,
    image: false,
  });

  const [errorDetailInput, setErrorDetailInput] = useState([
    {
      id: 0,
      title: false,
      description: false,
      image: false,
    },
  ]);
  const [submit, setSubmit] = useState(false);

  // const color = useColorModeValue;

  const [post, {}] = useMutation(UPLOADPOST);
  const [photo, {}] = useMutation(SAVE_PHOTO);

  if (loading) {
    return <div>Loading ....</div>;
  }

  if (me.me === null) {
    router.push("/");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!desciption.current)
      setErrorInput({ ...errorInput, description: true });
    if (!title.current) setErrorInput({ ...errorInput, title: true });
    if (image.current === "") setErrorInput({ ...errorInput, image: true });

    if (title.current && desciption.current && image.current) {
      await handleUpload();
    }
  };

  const handleUploadDetail = async (id: string) => {
    deleteDetail.map(async (e) => {
      const form = new FormData();

      if ((e.title !== "" && e.description !== "", e.imageUpload !== "")) {
        form.append("file", e.imageUpload);
        form.append("upload_preset", "next-upload");
        form.append("cloud_name", "ddphybme7");
        return fetch("https://api.cloudinary.com/v1_1/ddphybme7/image/upload", {
          method: "POST",
          body: form,
        })
          .then(async (res) => await res.json())
          .then(async (data) => {
            const dataPhoto = await photo({
              variables: {
                title: e.title,
                description: e.description,
                imageUrl: data.url,
                publicId: data.public_id,
                postId: id,
              },
            });
            console.log(dataPhoto);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleUpload = async () => {
    const form = new FormData();
    setSubmit(true);

    form.append("file", image.current);
    form.append("upload_preset", "next-upload");
    form.append("cloud_name", "ddphybme7");
    return fetch("https://api.cloudinary.com/v1_1/ddphybme7/image/upload", {
      method: "POST",
      body: form,
    })
      .then(async (res) => await res.json())
      .then(async (data) => {
        const dataPost = await post({
          variables: {
            title: title.current,
            description: desciption.current,
            imageUrl: data.url,
            publicId: data.public_id,
          },
        });
        const { id } = dataPost.data.savePost;
        await handleUploadDetail(id);
        setSubmit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    me && (
      <>
        <Box>
          <HeaderNavigator></HeaderNavigator>

          <form onSubmit={handleSubmit}>
            <Flex
              minH={"80vh"}
              align={"center"}
              justify={"center"}
              // bg={color("gray.50", "gray.800")}
            >
              <Stack
                spacing={4}
                w={"full"}
                maxW={"2xl"}
                // bg={color("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Upload Post
                </Heading>
                <FormControl
                  id="file-upload"
                  // isRequired
                  isInvalid={errorInput.image}
                >
                  <FormLabel>Post Image</FormLabel>
                  {errorInput.image ? (
                    <FormErrorMessage>Image is required.</FormErrorMessage>
                  ) : (
                    ""
                  )}
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={changeImage}>
                        <AvatarBadge
                          onClick={() => {
                            setChangeImage("https://bit.ly/sage-adebayo");
                            image.current = "";
                          }}
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full">
                        <label htmlFor="file_upload">Upload Image</label>
                      </Button>
                      <ImageInput
                        OnUpdate={(val: any) => {
                          image.current = val;
                          console.log(image.current);
                        }}
                        imageCloud={(val: any) => {
                          setChangeImage(val);
                        }}
                      />
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl
                  id="title"
                  // isRequired
                  isInvalid={errorInput.title}
                >
                  <FormLabel>Title</FormLabel>

                  <ControllInput
                    title="Title"
                    OnUpdate={(val: any) => {
                      title.current = val;
                    }}
                  />
                  {errorInput.title ? (
                    <FormErrorMessage>Title is required.</FormErrorMessage>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl
                  id="description"
                  // isRequired
                  isInvalid={errorInput.description}
                >
                  <FormLabel>Description</FormLabel>
                  <TextAreaEditor
                    OnUpdate={(val: any) => {
                      desciption.current = val;
                    }}
                  />
                  <br />
                  <br />
                  <br />
                  {/* <TextAreaInput
                  OnUpdate={(val: any) => {
                    desciption.current = val;
                  }}
                /> */}
                  {errorInput.description ? (
                    <FormErrorMessage>
                      Description is required.
                    </FormErrorMessage>
                  ) : (
                    ""
                  )}
                </FormControl>
                <HStack>
                  <Box>
                    <FormControl id="detail-image" mt={6} mr={2}>
                      {/* <FormLabel>Detail Title</FormLabel> */}
                      {deleteDetail.map((ex, index: number) => (
                        <Box key={index}>
                          <Avatar
                            key={index}
                            mb={1}
                            size="md"
                            src={ex.image}
                          ></Avatar>
                        </Box>

                        // <Input type="text" key={index} mb={2} />
                      ))}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="detail-title">
                      <FormLabel>Detail Title</FormLabel>

                      {deleteDetail.map((p) => {
                        return (
                          <div key={p.id}>
                            <Input
                              mb={2}
                              mr={8}
                              isInvalid
                              errorBorderColor={
                                p.title === "" ? "red.300" : "blue.300"
                              }
                              value={p.title}
                              onChange={(e: any) => {
                                const title = e.target.value;
                                setDeleteDetail((o) =>
                                  o.map((u) =>
                                    u.id === p.id && !/^\s/.test(e.target.value)
                                      ? { ...u, title }
                                      : u
                                  )
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="detail-description">
                      <FormLabel>Description</FormLabel>
                      {deleteDetail.map((p) => {
                        return (
                          <div key={p.id}>
                            <Input
                              mb={2}
                              isInvalid
                              errorBorderColor={
                                p.description === "" ? "red.300" : "blue.300"
                              }
                              value={p.description}
                              type="text"
                              onChange={(e: any) => {
                                const description = e.target.value;
                                setDeleteDetail((o) =>
                                  o.map((u) =>
                                    u.id === p.id && !/^\s/.test(e.target.value)
                                      ? { ...u, description }
                                      : u
                                  )
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="file_upload">
                      <FormLabel> Image</FormLabel>
                      {deleteDetail.map((p, index: number) => (
                        <Box key={p.id} display="flex">
                          <Button w="full" mr={2} mb={2}>
                            <FormLabel mt={2} htmlFor={p.id.toString()}>
                              upload
                            </FormLabel>
                          </Button>
                          <Input
                            type="file"
                            display="none"
                            id={p.id.toString()}
                            name="file-upload"
                            onChange={(e: any) => {
                              const [file] = e.target.files;
                              const image = URL.createObjectURL(file);
                              const imageUpload = file;
                              setDeleteDetail((o) =>
                                o.map((u) =>
                                  u.id === p.id
                                    ? { ...u, image, imageUpload }
                                    : u
                                )
                              );
                              // imageCloud(URL.createObjectURL(file));
                            }}
                          ></Input>
                          <ImageInput
                            OnUpdate={(val: any) => {
                              image.current = val;
                              console.log(image.current);
                            }}
                            imageCloud={(val: any) => {
                              setChangeImage(val);
                            }}
                          />

                          <Box>
                            {!deleteDetail[index].condition && (
                              <AddIcon
                                mt={3}
                                onClick={() => {
                                  // setDetail([...detail, `${e.id + 1}`]);
                                  const form = {
                                    id: p.id + 1,
                                    condition: false,
                                    title: "",
                                    description: "",
                                    image: "",
                                    imageUpload: "",
                                  };
                                  const storePre: Detail[] = [...deleteDetail];
                                  storePre[index].condition = true;
                                  setDeleteDetail([...storePre, form]);

                                  // setStoreDetail((storeDetail) => [
                                  //   ...storeDetail,
                                  //   detail,
                                  // ]);
                                }}
                              />
                            )}
                            {deleteDetail[index].condition && (
                              <CloseIcon
                                mt={3}
                                onClick={() => {
                                  setDeleteDetail(
                                    deleteDetail.filter((e) => e.id !== p.id)
                                  );
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      ))}
                      {/* <AddIcon onClick={() => setDetail([...detail, "add"])} /> */}
                    </FormControl>
                  </Box>
                </HStack>
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    // disabled={submit}
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    {submit ? <Spinner color="white" /> : "Submit"}
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </form>
        </Box>
        <br />
        <br />
        <br />
        <Footer></Footer>
      </>
    )
  );
};

export default UploadPost;
