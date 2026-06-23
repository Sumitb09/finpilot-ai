import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function TransactionSkeleton() {
  return (
    <SkeletonPlaceholder>
      {[1,2,3,4,5].map((item)=>(
        <SkeletonPlaceholder.Item
          key={item}
          marginBottom={18}
          flexDirection="row"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={48}
            height={48}
            borderRadius={24}
          />

          <SkeletonPlaceholder.Item
            marginLeft={14}
          >
            <SkeletonPlaceholder.Item
              width={160}
              height={18}
            />

            <SkeletonPlaceholder.Item
              width={80}
              height={14}
              marginTop={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      ))}
    </SkeletonPlaceholder>
  );
}