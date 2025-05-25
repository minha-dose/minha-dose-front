import { globalStyles } from "@/styles/globalStyle";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

type PhotoCircleProps = {
    imageSource: ImageSourcePropType;
    size?: number;
};

export default function PhotoCircle({ imageSource, size = 100 }: PhotoCircleProps) {
    return (
        <View style={[globalStyles.photoCircle, { width: size, height: size, borderRadius: size / 2 }]}>
            <Image
                source={imageSource}
                resizeMode="cover"
                style={{ width: size, height: size, borderRadius: size / 2 }}
            />
        </View>
    );
}